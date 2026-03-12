/**
 * Utility to convert HTML to Sanity Portable Text format
 * Converts HTML tags to Portable Text blocks with proper structure
 */

import { JSDOM } from 'jsdom'

export function htmlToPortableText(html) {
  if (!html || typeof html !== 'string') return []
  
  // Create a temporary DOM element to parse HTML
  // Note: This works in Node.js with jsdom, but for browser you'd use DOMParser
  const dom = new JSDOM(html)
  const document = dom.window.document
  
  const blocks = []
  let blockKey = 0
  
  // Helper to create a text span
  function createSpan(text, marks = []) {
    return {
      _type: 'span',
      _key: `span-${blockKey}-${Math.random().toString(36).substr(2, 9)}`,
      text: text || '',
      marks: marks
    }
  }
  
  // Helper to create a block
  function createBlock(style, children, markDefs = []) {
    return {
      _type: 'block',
      _key: `block-${blockKey++}`,
      style: style,
      children: children,
      markDefs: markDefs
    }
  }
  
  // Process a node recursively
  function processNode(node, currentMarks = [], links = []) {
    const result = []
    
    if (node.nodeType === 3) { // Text node
      const text = node.textContent.trim()
      if (text) {
        result.push(createSpan(text, [...currentMarks]))
      }
    } else if (node.nodeType === 1) { // Element node
      const tagName = node.tagName.toLowerCase()
      const children = []
      
      // Process child nodes
      for (const child of Array.from(node.childNodes)) {
        const childResult = processNode(child, currentMarks, links)
        children.push(...childResult)
      }
      
      // Handle different HTML tags
      switch (tagName) {
        case 'h1':
          if (children.length > 0) {
            blocks.push(createBlock('h1', children))
          }
          break
        case 'h2':
          if (children.length > 0) {
            blocks.push(createBlock('h2', children))
          }
          break
        case 'h3':
          if (children.length > 0) {
            blocks.push(createBlock('h3', children))
          }
          break
        case 'h4':
          if (children.length > 0) {
            blocks.push(createBlock('h4', children))
          }
          break
        case 'h5':
          if (children.length > 0) {
            blocks.push(createBlock('h5', children))
          }
          break
        case 'h6':
          if (children.length > 0) {
            blocks.push(createBlock('h6', children))
          }
          break
        case 'p':
          if (children.length > 0) {
            blocks.push(createBlock('normal', children))
          }
          break
        case 'blockquote':
          if (children.length > 0) {
            blocks.push(createBlock('blockquote', children))
          }
          break
        case 'strong':
        case 'b':
          if (children.length > 0) {
            result.push(...children.map(child => ({
              ...child,
              marks: [...(child.marks || []), 'strong']
            })))
          }
          break
        case 'em':
        case 'i':
          if (children.length > 0) {
            result.push(...children.map(child => ({
              ...child,
              marks: [...(child.marks || []), 'em']
            })))
          }
          break
        case 'code':
          if (children.length > 0) {
            result.push(...children.map(child => ({
              ...child,
              marks: [...(child.marks || []), 'code']
            })))
          }
          break
        case 'u':
          if (children.length > 0) {
            result.push(...children.map(child => ({
              ...child,
              marks: [...(child.marks || []), 'underline']
            })))
          }
          break
        case 'a':
          const href = node.getAttribute('href') || ''
          const target = node.getAttribute('target')
          const linkKey = `link-${links.length}`
          links.push({
            _key: linkKey,
            _type: 'link',
            href: href,
            blank: target === '_blank'
          })
          if (children.length > 0) {
            result.push(...children.map(child => ({
              ...child,
              marks: [...(child.marks || []), linkKey]
            })))
          }
          break
        case 'br':
          result.push(createSpan('\n'))
          break
        default:
          // For other tags, just process children
          result.push(...children)
      }
    }
    
    return result
  }
  
  // Process the body or the entire document
  const body = document.body || document.documentElement
  processNode(body)
  
  // Add link markDefs to blocks that need them
  const allLinks = []
  function extractLinks(node) {
    if (node.nodeType === 1 && node.tagName.toLowerCase() === 'a') {
      const href = node.getAttribute('href') || ''
      const target = node.getAttribute('target')
      allLinks.push({
        _key: `link-${allLinks.length}`,
        _type: 'link',
        href: href,
        blank: target === '_blank'
      })
    }
    for (const child of Array.from(node.childNodes)) {
      extractLinks(child)
    }
  }
  extractLinks(body)
  
  // Rebuild blocks with proper link markDefs
  const finalBlocks = blocks.map(block => {
    // Extract link keys from children
    const linkKeys = new Set()
    function findLinkKeys(children) {
      children.forEach(child => {
        if (child.marks) {
          child.marks.forEach(mark => {
            if (mark.startsWith('link-')) {
              linkKeys.add(mark)
            }
          })
        }
      })
    }
    findLinkKeys(block.children)
    
    // Add corresponding markDefs
    const markDefs = allLinks.filter(link => linkKeys.has(link._key))
    
    return {
      ...block,
      markDefs: markDefs
    }
  })
  
  // If no blocks were created, create an empty one
  if (finalBlocks.length === 0) {
    return [
      createBlock('normal', [createSpan('')])
    ]
  }
  
  return finalBlocks
}
