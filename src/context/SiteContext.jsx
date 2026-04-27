import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  INITIAL_COUNTER,
  INITIAL_BLOG_POSTS,
  GALLERY_IMAGES,
  TEAM,
  PROGRAMS,
  SITE_CONFIG,
} from '../data/siteData'

const SiteContext = createContext(null)

export function SiteProvider({ children }) {
  const [counter, setCounter] = useState(() => {
    try { const s = localStorage.getItem('dssn_counter'); return s ? JSON.parse(s) : INITIAL_COUNTER } catch { return INITIAL_COUNTER }
  })
  const [posts, setPosts] = useState(() => {
    try { const s = localStorage.getItem('dssn_posts'); return s ? JSON.parse(s) : INITIAL_BLOG_POSTS } catch { return INITIAL_BLOG_POSTS }
  })
  const [gallery, setGallery] = useState(() => {
    try { const s = localStorage.getItem('dssn_gallery'); return s ? JSON.parse(s) : GALLERY_IMAGES } catch { return GALLERY_IMAGES }
  })
  const [team, setTeam] = useState(() => {
    try { const s = localStorage.getItem('dssn_team'); return s ? JSON.parse(s) : TEAM } catch { return TEAM }
  })
  const [programs, setPrograms] = useState(() => {
    try { const s = localStorage.getItem('dssn_programs'); return s ? JSON.parse(s) : PROGRAMS } catch { return PROGRAMS }
  })

  useEffect(() => { localStorage.setItem('dssn_counter', JSON.stringify(counter)) }, [counter])
  useEffect(() => { localStorage.setItem('dssn_posts', JSON.stringify(posts)) }, [posts])
  useEffect(() => { localStorage.setItem('dssn_gallery', JSON.stringify(gallery)) }, [gallery])
  useEffect(() => { localStorage.setItem('dssn_team', JSON.stringify(team)) }, [team])
  useEffect(() => { localStorage.setItem('dssn_programs', JSON.stringify(programs)) }, [programs])

  const addPost = (post) => { setPosts(prev => [{ ...post, id: Date.now() }, ...prev]) }
  const updatePost = (id, updates) => { setPosts(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p)) }
  const deletePost = (id) => { setPosts(prev => prev.filter(p => p.id !== id)) }

  const addGalleryImage = (image) => { setGallery(prev => [{ ...image, id: Date.now() }, ...prev]) }
  const deleteGalleryImage = (id) => { setGallery(prev => prev.filter(img => img.id !== id)) }

  const addTeamMember = (member) => { setTeam(prev => [...prev, { ...member, id: Date.now() }]) }
  const updateTeamMember = (id, updates) => { setTeam(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m)) }
  const deleteTeamMember = (id) => { setTeam(prev => prev.filter(m => m.id !== id)) }

  const updateCounter = (updates) => { setCounter(prev => ({ ...prev, ...updates })) }
  const updateProgram = (id, updates) => { setPrograms(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p)) }

  return (
    <SiteContext.Provider value={{
      counter, updateCounter,
      posts, addPost, updatePost, deletePost,
      gallery, addGalleryImage, deleteGalleryImage,
      addGalleryItem: addGalleryImage,
      deleteGalleryItem: deleteGalleryImage,
      team, addTeamMember, updateTeamMember, deleteTeamMember,
      programs, updateProgram,
      siteConfig: SITE_CONFIG,
    }}>
      {children}
    </SiteContext.Provider>
  )
}

export const useSite = () => {
  const ctx = useContext(SiteContext)
  if (!ctx) throw new Error('useSite must be used within SiteProvider')
  return ctx
}
