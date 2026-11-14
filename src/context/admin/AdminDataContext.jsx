import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react'
import {
  db,
  isFirebaseConfigured,
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot
} from '../../services/firebase'

const AdminDataContext = createContext(null)

const STORAGE_KEY = 'lionorca_admin_data'

// ── Seed Data ──────────────────────────────────────────────────────────────────

const SEED_LEADS = [
  {
    id: 'lead-001',
    date: '2024-11-02',
    name: 'Rajesh Agrawal',
    phone: '+91 98261 43210',
    email: 'rajesh.agrawal@gmail.com',
    projectType: 'Luxury Villa',
    investmentRange: '₹2.5 Cr – ₹4 Cr',
    status: 'New',
    notes: 'Interested in a 5BHK villa in Vijay Nagar, Indore. Wants contemporary design with vastu compliance.',
  },
  {
    id: 'lead-002',
    date: '2024-10-28',
    name: 'Priya Sharma',
    phone: '+91 78690 55432',
    email: 'priya.sharma@outlook.com',
    projectType: 'Penthouse Interior',
    investmentRange: '₹80 L – ₹1.5 Cr',
    status: 'In Progress',
    notes: 'Penthouse at Omaxe Celestia, 3200 sqft. Prefers minimalist luxury with Italian marble.',
  },
  {
    id: 'lead-003',
    date: '2024-10-15',
    name: 'Vikram Singh Rathore',
    phone: '+91 94250 11234',
    email: 'vikram.rathore@yahoo.com',
    projectType: 'Farmhouse',
    investmentRange: '₹5 Cr – ₹8 Cr',
    status: 'In Progress',
    notes: 'Weekend farmhouse on Khandwa Road. 2 acres. Wants resort-style architecture with pool and landscaping.',
  },
  {
    id: 'lead-004',
    date: '2024-10-05',
    name: 'Sneha Jain',
    phone: '+91 88177 99321',
    email: 'sneha.jain@gmail.com',
    projectType: 'Office Interior',
    investmentRange: '₹40 L – ₹70 L',
    status: 'Closed',
    notes: 'Corporate office at IT Park, 2000 sqft. Project completed successfully.',
  },
  {
    id: 'lead-005',
    date: '2024-11-05',
    name: 'Ankit Mehta',
    phone: '+91 99932 67812',
    email: 'ankit.mehta@hotmail.com',
    projectType: 'Luxury Apartment',
    investmentRange: '₹1 Cr – ₹2 Cr',
    status: 'New',
    notes: '4BHK at Phoenix Citadel. Full interior design with smart home integration.',
  },
  {
    id: 'lead-006',
    date: '2024-11-08',
    name: 'Deepika Patel',
    phone: '+91 70000 34521',
    email: 'deepika.patel@gmail.com',
    projectType: 'Boutique Hotel',
    investmentRange: '₹10 Cr+',
    status: 'New',
    notes: 'Heritage boutique hotel project in Maheshwar. 12 rooms with contemporary-traditional fusion.',
  },
]

const SEED_VENDORS = [
  {
    id: 'vendor-001',
    businessName: 'Shree Marbles & Granites',
    category: 'Stone & Marble',
    contact: 'Ramesh Gupta',
    email: 'info@shreemarbles.com',
    phone: '+91 73140 88321',
    status: 'Active',
  },
  {
    id: 'vendor-002',
    businessName: 'Indore Custom Woodworks',
    category: 'Carpentry & Joinery',
    contact: 'Mohammad Salim',
    email: 'salim@icwoodworks.in',
    phone: '+91 98265 44210',
    status: 'Active',
  },
  {
    id: 'vendor-003',
    businessName: 'LightCraft Solutions',
    category: 'Lighting & Electricals',
    contact: 'Pooja Deshmukh',
    email: 'pooja@lightcraft.co.in',
    phone: '+91 88199 22145',
    status: 'Active',
  },
  {
    id: 'vendor-004',
    businessName: 'BuildRight Construction',
    category: 'Civil Construction',
    contact: 'Suresh Yadav',
    email: 'suresh@buildright.in',
    phone: '+91 94251 76543',
    status: 'Inactive',
  },
]

const SEED_APPLICANTS = [
  {
    id: 'app-001',
    name: 'Aarav Kulkarni',
    role: 'Junior Architect',
    contact: '+91 88776 55443',
    email: 'aarav.kulkarni@gmail.com',
    resumeUrl: '/resumes/aarav-kulkarni.pdf',
    appliedDate: '2024-10-20',
  },
  {
    id: 'app-002',
    name: 'Nisha Verma',
    role: 'Interior Designer',
    contact: '+91 99321 44567',
    email: 'nisha.verma@outlook.com',
    resumeUrl: '/resumes/nisha-verma.pdf',
    appliedDate: '2024-11-01',
  },
  {
    id: 'app-003',
    name: 'Rohan Tiwari',
    role: '3D Visualization Artist',
    contact: '+91 70456 88901',
    email: 'rohan.tiwari@gmail.com',
    resumeUrl: '/resumes/rohan-tiwari.pdf',
    appliedDate: '2024-11-06',
  },
]

const SEED_PROJECTS = [
  {
    id: 'proj-001',
    title: 'The Ivory Manor',
    description:
      'A 7,500 sqft luxury villa in Vijay Nagar featuring neo-classical architecture with contemporary interiors. Double-height living spaces, Italian marble flooring, and a private courtyard garden.',
    imageUrl: '/images/hero-arch-1.jpg',
    category: 'Luxury Villa',
    status: 'Published',
    createdAt: '2024-06-15',
  },
  {
    id: 'proj-002',
    title: 'Celestia Penthouse',
    description:
      'Minimalist luxury penthouse interior spanning 3,200 sqft at Omaxe Celestia. Features bespoke walnut cabinetry, concealed lighting, and panoramic city views through floor-to-ceiling glazing.',
    imageUrl: '/images/hero-bedroom.jpg',
    category: 'Penthouse Interior',
    status: 'Published',
    createdAt: '2024-08-22',
  },
  {
    id: 'proj-003',
    title: 'Khandwa Road Farmhouse',
    description:
      'Resort-style weekend retreat on 2 acres. Stone-clad facades, infinity pool, open-air pavilion, and manicured landscapes blending modern comfort with rustic Malwa charm.',
    imageUrl: '/images/hero-bright-1.jpg',
    category: 'Farmhouse',
    status: 'Published',
    createdAt: '2024-09-10',
  },
  {
    id: 'proj-004',
    title: 'Sapphire Heights Residence',
    description:
      'Full interior design for a 4BHK apartment with smart home integration, custom furniture, and a curated art collection. Warm tones with champagne gold accents.',
    imageUrl: '/images/hero-bright-2.jpg',
    category: 'Luxury Apartment',
    status: 'Draft',
    createdAt: '2024-10-30',
  },
]

const SEED_ARTICLES = [
  {
    id: 'art-001',
    title: 'The Art of Vastu-Compliant Luxury Design',
    date: '2024-09-12',
    coverImage: '/images/hero-arch-2.jpg',
    body: '<p>In the realm of luxury architecture, harmonising ancient Vastu Shastra principles with contemporary aesthetics is both an art and a science. At Lionorca Architeriors, we believe that spatial energy flow and modern design language can coexist beautifully.</p><p>Our approach begins with orientation analysis — ensuring the master bedroom faces southwest for stability, while living spaces open to the northeast for positive energy. Natural light pathways are carefully orchestrated to align with Vastu guidelines without compromising the clean lines and open plans our clients love.</p><p>The result is a home that feels intuitively right — where every room breathes, every corner has purpose, and luxury is felt, not just seen.</p>',
    status: 'Published',
    author: 'Akshay Jadaun',
  },
  {
    id: 'art-002',
    title: 'Italian Marble vs Indian Stone: Choosing the Right Foundation',
    date: '2024-10-05',
    coverImage: '/images/hero-arch-3.jpg',
    body: '<p>The choice of flooring material sets the tone for an entire space. Italian marble — Statuario, Calacatta, Bottocino — brings a luminous, veined elegance that has been the hallmark of palatial design for centuries.</p><p>However, Indian stones like Makrana marble, Kota stone, and Rajasthani sandstone carry their own quiet grandeur. They are climatically suited to central India, more sustainable, and can be sourced ethically from regional quarries.</p><p>At Lionorca, we often blend both — Italian marble in formal living areas and Indian stone in courtyards and outdoor spaces — creating a dialogue between global luxury and local identity.</p>',
    status: 'Published',
    author: 'Akshay Jadaun',
  },
  {
    id: 'art-003',
    title: 'Smart Homes, Smarter Living: Technology in Luxury Residences',
    date: '2024-11-01',
    coverImage: '/images/hero-kitchen.jpg',
    body: '<p>The modern luxury home is no longer defined solely by materials and craftsmanship — it is equally defined by intelligence. Smart home systems have evolved from novelty gadgets to essential infrastructure in high-end residences.</p><p>We integrate KNX and Crestron systems for unified control of lighting, climate, security, and entertainment. Motorised curtains respond to daylight sensors. Kitchen appliances sync with inventory management apps. Even irrigation systems are weather-responsive.</p><p>Yet the true art lies in concealment — technology should serve without being seen. No visible wires, no cluttered panels, just seamless living.</p>',
    status: 'Draft',
    author: 'Akshay Jadaun',
  },
]

const SEED_DATA = {
  leads: SEED_LEADS,
  vendors: SEED_VENDORS,
  applicants: SEED_APPLICANTS,
  projects: SEED_PROJECTS,
  articles: SEED_ARTICLES,
}

// ── Helper ─────────────────────────────────────────────────────────────────────

function generateId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`
}

// ── Provider ───────────────────────────────────────────────────────────────────

export function AdminDataProvider({ children }) {
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch {
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    return SEED_DATA
  })

  const [dbMode, setDbMode] = useState(isFirebaseConfigured && db ? 'firestore' : 'local')
  const [isSyncing, setIsSyncing] = useState(false)
  const isMountedRef = useRef(true)

  // 1. Persist local cache on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  // 2. Real-time Firestore sync when live Firebase is active
  useEffect(() => {
    isMountedRef.current = true

    if (!isFirebaseConfigured || !db) {
      setDbMode('local')
      return
    }

    setDbMode('firestore')
    const collections = ['leads', 'vendors', 'applicants', 'projects', 'articles']
    const unsubscribes = []

    collections.forEach((colName) => {
      try {
        const colRef = collection(db, colName)
        const unsub = onSnapshot(
          colRef,
          (snapshot) => {
            if (!isMountedRef.current) return
            if (!snapshot.empty) {
              const items = snapshot.docs.map((d) => ({
                ...d.data(),
                id: d.id,
              }))
              setData((prev) => ({
                ...prev,
                [colName]: items,
              }))
            }
          },
          (err) => {
            console.warn(`Firestore sync error on [${colName}], falling back to local:`, err)
            setDbMode('local')
          }
        )
        unsubscribes.push(unsub)
      } catch (err) {
        console.warn(`Failed to attach listener for ${colName}:`, err)
      }
    })

    return () => {
      isMountedRef.current = false
      unsubscribes.forEach((unsub) => unsub())
    }
  }, [])

  // ── Firestore Write Helper ──────────────────────────────────────────────────
  const syncToFirestore = useCallback(async (collectionName, id, itemData, action = 'set') => {
    if (!isFirebaseConfigured || !db) return

    try {
      const docRef = doc(db, collectionName, id)
      if (action === 'set') {
        await setDoc(docRef, itemData, { merge: true })
      } else if (action === 'update') {
        await updateDoc(docRef, itemData)
      } else if (action === 'delete') {
        await deleteDoc(docRef)
      }
    } catch (err) {
      console.warn(`Firestore ${action} error on ${collectionName}/${id}:`, err)
    }
  }, [])

  // ── Generic CRUD factory ───────────────────────────────────────────────────

  const addItem = useCallback(
    (collectionName, item) => {
      setData((prev) => ({
        ...prev,
        [collectionName]: [item, ...(prev[collectionName] || [])],
      }))
      syncToFirestore(collectionName, item.id, item, 'set')
    },
    [syncToFirestore]
  )

  const updateItem = useCallback(
    (collectionName, id, updates) => {
      setData((prev) => ({
        ...prev,
        [collectionName]: (prev[collectionName] || []).map((item) =>
          item.id === id ? { ...item, ...updates } : item
        ),
      }))
      syncToFirestore(collectionName, id, updates, 'update')
    },
    [syncToFirestore]
  )

  const deleteItem = useCallback(
    (collectionName, id) => {
      setData((prev) => ({
        ...prev,
        [collectionName]: (prev[collectionName] || []).filter((item) => item.id !== id),
      }))
      syncToFirestore(collectionName, id, null, 'delete')
    },
    [syncToFirestore]
  )

  // ── One-click Firestore Seeder ─────────────────────────────────────────────
  const seedFirestoreDatabase = useCallback(async () => {
    if (!isFirebaseConfigured || !db) {
      alert('Firebase credentials not detected in .env. Currently using Local Storage.')
      return
    }

    setIsSyncing(true)
    try {
      for (const [colName, items] of Object.entries(SEED_DATA)) {
        for (const item of items) {
          const docRef = doc(db, colName, item.id)
          await setDoc(docRef, item, { merge: true })
        }
      }
      alert('✅ Successfully seeded initial Lionorca data to Firebase Firestore!')
    } catch (err) {
      console.error('Error seeding Firestore:', err)
      alert(`Firestore seed failed: ${err.message}`)
    } finally {
      setIsSyncing(false)
    }
  }, [])

  // ── Leads ──────────────────────────────────────────────────────────────────

  const addLead = useCallback(
    (lead) =>
      addItem('leads', {
        ...lead,
        id: generateId('lead'),
        date: lead.date || new Date().toISOString().slice(0, 10),
        status: lead.status || 'New',
      }),
    [addItem]
  )
  const updateLead = useCallback(
    (id, updates) => updateItem('leads', id, updates),
    [updateItem]
  )
  const deleteLead = useCallback(
    (id) => deleteItem('leads', id),
    [deleteItem]
  )

  // ── Vendors ────────────────────────────────────────────────────────────────

  const addVendor = useCallback(
    (vendor) =>
      addItem('vendors', {
        ...vendor,
        id: generateId('vendor'),
        status: vendor.status || 'Active',
      }),
    [addItem]
  )
  const updateVendor = useCallback(
    (id, updates) => updateItem('vendors', id, updates),
    [updateItem]
  )
  const deleteVendor = useCallback(
    (id) => deleteItem('vendors', id),
    [deleteItem]
  )

  // ── Applicants ─────────────────────────────────────────────────────────────

  const addApplicant = useCallback(
    (applicant) =>
      addItem('applicants', {
        ...applicant,
        id: generateId('app'),
        appliedDate: applicant.appliedDate || new Date().toISOString().slice(0, 10),
      }),
    [addItem]
  )
  const updateApplicant = useCallback(
    (id, updates) => updateItem('applicants', id, updates),
    [updateItem]
  )
  const deleteApplicant = useCallback(
    (id) => deleteItem('applicants', id),
    [deleteItem]
  )

  // ── Projects ───────────────────────────────────────────────────────────────

  const addProject = useCallback(
    (project) =>
      addItem('projects', {
        ...project,
        id: generateId('proj'),
        status: project.status || 'Draft',
        createdAt: project.createdAt || new Date().toISOString().slice(0, 10),
      }),
    [addItem]
  )
  const updateProject = useCallback(
    (id, updates) => updateItem('projects', id, updates),
    [updateItem]
  )
  const deleteProject = useCallback(
    (id) => deleteItem('projects', id),
    [deleteItem]
  )

  // ── Articles ───────────────────────────────────────────────────────────────

  const addArticle = useCallback(
    (article) =>
      addItem('articles', {
        ...article,
        id: generateId('art'),
        status: article.status || 'Draft',
        date: article.date || new Date().toISOString().slice(0, 10),
      }),
    [addItem]
  )
  const updateArticle = useCallback(
    (id, updates) => updateItem('articles', id, updates),
    [updateItem]
  )
  const deleteArticle = useCallback(
    (id) => deleteItem('articles', id),
    [deleteItem]
  )

  // ── Context value ──────────────────────────────────────────────────────────

  const value = {
    // Data
    leads: data.leads || [],
    vendors: data.vendors || [],
    applicants: data.applicants || [],
    projects: data.projects || [],
    articles: data.articles || [],

    // Sync status & controls
    dbMode,
    isSyncing,
    isFirebaseConfigured,
    seedFirestoreDatabase,

    // Lead actions
    addLead,
    updateLead,
    deleteLead,

    // Vendor actions
    addVendor,
    updateVendor,
    deleteVendor,

    // Applicant actions
    addApplicant,
    updateApplicant,
    deleteApplicant,

    // Project actions
    addProject,
    updateProject,
    deleteProject,

    // Article actions
    addArticle,
    updateArticle,
    deleteArticle,
  }

  return (
    <AdminDataContext.Provider value={value}>
      {children}
    </AdminDataContext.Provider>
  )
}

export function useAdminData() {
  const ctx = useContext(AdminDataContext)
  if (!ctx) throw new Error('useAdminData must be inside AdminDataProvider')
  return ctx
}
