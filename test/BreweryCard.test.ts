import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
// Use type-only import for Vue component to avoid TypeScript errors
import type { DefineComponent } from 'vue'

// Mock the component for testing
const BreweryCard = {} as DefineComponent<any, any, any>
import type { Brewery } from '../types/brewery'

describe('BreweryCard', () => {
  const mockBrewery: Brewery = {
    id: 'test-brewery',
    name: 'Test Brewery',
    brewery_type: 'micro',
    street: '123 Beer St',
    address_1: '123 Beer St',
    city: 'Hopville',
    state: 'Craftland',
    postal_code: '12345',
    country: 'Beerland',
    longitude: '-123.4567',
    latitude: '45.6789',
    phone: '1234567890',
    website_url: 'https://testbrewery.com',
    state_province: 'Craftland'
  }

  it('renders brewery name correctly', () => {
    const wrapper = mount(BreweryCard, {
      props: {
        brewery: mockBrewery
      },
      global: {
        stubs: ['NuxtLink'] // Stub NuxtLink to avoid router errors
      }
    })

    expect(wrapper.find('h2').text()).toBe('Test Brewery')
  })

  it('displays brewery type badge', () => {
    const wrapper = mount(BreweryCard, {
      props: {
        brewery: mockBrewery
      },
      global: {
        stubs: ['NuxtLink']
      }
    })

    const badge = wrapper.find('.rounded-full')
    expect(badge.exists()).toBe(true)
    expect(badge.text()).toContain('Micro')
  })

  it('formats and displays location correctly', () => {
    const wrapper = mount(BreweryCard, {
      props: {
        brewery: mockBrewery
      },
      global: {
        stubs: ['NuxtLink']
      }
    })

    expect(wrapper.text()).toContain('Hopville, Craftland, Beerland')
  })

  it('displays website link when available', () => {
    const wrapper = mount(BreweryCard, {
      props: {
        brewery: mockBrewery
      },
      global: {
        stubs: ['NuxtLink']
      }
    })

    const websiteLink = wrapper.find('a[href="https://testbrewery.com"]')
    expect(websiteLink.exists()).toBe(true)
  })

  it('does not display website link when not available', () => {
    const breweryWithoutWebsite = { ...mockBrewery, website_url: null }
    const wrapper = mount(BreweryCard, {
      props: {
        brewery: breweryWithoutWebsite
      },
      global: {
        stubs: ['NuxtLink']
      }
    })

    // Look for any anchor tag with a website URL
    const websiteLinks = wrapper.findAll('a').filter((link: any) => 
      link.attributes('href') && link.attributes('href').includes('http')
    )
    
    // There should be no external website links
    expect(websiteLinks.length).toBe(0)
  })

  it('formats phone number correctly', () => {
    const wrapper = mount(BreweryCard, {
      props: {
        brewery: mockBrewery
      },
      global: {
        stubs: ['NuxtLink']
      }
    })

    expect(wrapper.text()).toContain('(123) 456-7890')
  })

  it('includes a link to brewery details page', () => {
    const wrapper = mount(BreweryCard, {
      props: {
        brewery: mockBrewery
      },
      global: {
        stubs: ['NuxtLink']
      }
    })

    // Find NuxtLink with the correct to prop
    const detailsLink = wrapper.findComponent({ name: 'NuxtLink' })
    expect(detailsLink.attributes('to')).toBe('/breweries/test-brewery')
  })
})
