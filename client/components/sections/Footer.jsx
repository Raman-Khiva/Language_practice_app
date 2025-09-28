'use client'

import React from 'react'
import Link from 'next/link'
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa'
import Badge from '../common/Badge'
import { HiOutlineSparkles } from 'react-icons/hi'

const navigation = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Integrations', href: '#integrations' },
      { label: 'Updates', href: '#updates' }
    ]
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Blog', href: '#blog' },
      { label: 'Help Center', href: '#help' },
      { label: 'Guides', href: '#guides' },
      { label: 'Community', href: '#community' }
    ]
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Careers', href: '#careers' },
      { label: 'Press', href: '#press' },
      { label: 'Contact', href: '#contact' }
    ]
  }
]

const policies = [
  { label: 'Privacy Policy', href: '#privacy' },
  { label: 'Terms of Service', href: '#terms' },
  { label: 'Cookie Policy', href: '#cookies' }
]

const Footer = () => {
  return (
    <footer className='w-full bg-[rgb(246,246,246)] text-black/80 pt-20 pb-10 px-8 md:px-24'>
      <div className='max-w-6xl mx-auto flex flex-col gap-16'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-10 items-start'>
          <div className='flex flex-col gap-5'>
            <Badge tag='Lingua App' icon={HiOutlineSparkles} />
            <h3 className='text-3xl font-[500] text-black/85'>Your AI-powered language companion</h3>
            <p className='text-black/60 text-[15px] font-[500] leading-relaxed'>
              Practice speaking, get real-time corrections, and stay motivated with adaptive guidance tuned to your goals.
            </p>
            <div className='flex items-center gap-3'>
              {[FaTwitter, FaFacebookF, FaYoutube, FaLinkedinIn].map((Icon, idx) => (
                <Link key={idx} href='#social'
                  className='h-11 w-11 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-colors text-black/70'>
                  <Icon className='text-lg' />
                </Link>
              ))}
            </div>
          </div>

          {navigation.map((section) => (
            <div key={section.heading} className='flex flex-col gap-4 text-black/70'>
              <h4 className='text-lg font-[600] text-black/90'>{section.heading}</h4>
              <div className='flex flex-col gap-2 text-[15px] font-[500]'>
                {section.links.map((link) => (
                  <Link key={link.label} href={link.href} className='hover:text-black transition-colors'>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className='w-full h-px bg-black/10' />

        <div className='flex flex-col md:flex-row md:items-center justify-between gap-5 text-sm text-black/50 font-[500]'>
          <p>© {new Date().getFullYear()} Lingua App. All rights reserved.</p>
          <div className='flex flex-wrap items-center gap-4'>
            {policies.map((policy) => (
              <Link key={policy.label} href={policy.href} className='hover:text-black transition-colors'>
                {policy.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
