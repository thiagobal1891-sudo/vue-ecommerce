import { ref, onUnmounted } from 'vue'

export function useIntersectionObserver(options = {}) {
  const observer = ref(null)
  const isSupported = 'IntersectionObserver' in window
  
  const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    ...options
  }

  const observeElement = (selector, callback, customOptions = {}) => {
    if (!isSupported) {
      console.warn('IntersectionObserver is not supported in this browser')
      return
    }

    const element = document.querySelector(selector)
    if (!element) {
      console.warn(`Element with selector "${selector}" not found`)
      return
    }

    const finalOptions = { ...defaultOptions, ...customOptions }
    
    observer.value = new IntersectionObserver((entries) => {
      callback(entries)
    }, finalOptions)

    observer.value.observe(element)
  }

  const unobserve = (element) => {
    if (observer.value && element) {
      observer.value.unobserve(element)
    }
  }

  const disconnect = () => {
    if (observer.value) {
      observer.value.disconnect()
      observer.value = null
    }
  }

  onUnmounted(() => {
    disconnect()
  })

  return {
    observer,
    observeElement,
    unobserve,
    disconnect,
    isSupported
  }
}
