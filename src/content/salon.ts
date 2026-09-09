// Salt & Stone Wellness -- a fictional salon/spa created for WebVybe's
// portfolio demo. There is no real business behind this content; it exists
// to show how WebVybe would build a real salon/spa client site. Keep prices
// and copy internally consistent if this file is edited.

export const salon = {
  name: 'Salt & Stone Wellness',
  tagline: 'Quiet, considered care for the skin and body.',
  neighborhood: 'North Park, San Diego',
  address: '3016 Herman Ave, Suite B, San Diego, CA 92104',
  phone: '(619) 555-0142',
  phoneHref: 'tel:+16195550142',
  email: 'hello@saltandstonewellness.com',
  instagram: '@saltandstonewellness',
  founderName: 'Mara Whitfield, LMT',
  founded: 2019,
}

export const hours = [
  { day: 'Monday', time: 'Closed' },
  { day: 'Tuesday', time: '10:00am – 7:00pm' },
  { day: 'Wednesday', time: '10:00am – 7:00pm' },
  { day: 'Thursday', time: '10:00am – 7:00pm' },
  { day: 'Friday', time: '10:00am – 7:00pm' },
  { day: 'Saturday', time: '9:00am – 6:00pm' },
  { day: 'Sunday', time: '10:00am – 4:00pm' },
]

export type ServiceItem = {
  name: string
  duration: string
  price: string
  description: string
}

export type ServiceCategory = {
  id: string
  title: string
  intro: string
  items: ServiceItem[]
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'massage',
    title: 'Massage',
    intro:
      'Every massage opens with a two-minute check-in so pressure and focus areas are set before hands ever touch the table.',
    items: [
      {
        name: 'Signature Swedish',
        duration: '50 min',
        price: '$125',
        description: 'Long, even strokes for full-body tension release and a slower nervous system.',
      },
      {
        name: 'Signature Swedish',
        duration: '80 min',
        price: '$175',
        description: 'The full-length version, with added time for feet, scalp, and neck.',
      },
      {
        name: 'Deep Tissue',
        duration: '50 min',
        price: '$140',
        description: 'Slower, firmer work through the shoulders, low back, and hips.',
      },
      {
        name: 'Deep Tissue',
        duration: '80 min',
        price: '$190',
        description: 'For chronic tightness or training recovery that needs more time to unwind.',
      },
      {
        name: 'Prenatal Massage',
        duration: '50 min',
        price: '$130',
        description: 'Side-lying, pillow-supported bodywork safe for all trimesters.',
      },
    ],
  },
  {
    id: 'skincare',
    title: 'Facials & Skincare',
    intro: 'Facials are built around what your skin is doing that week, not a fixed script.',
    items: [
      {
        name: 'Signature Facial',
        duration: '50 min',
        price: '$135',
        description: 'Double cleanse, enzyme resurfacing, extractions as needed, and a custom mask.',
      },
      {
        name: 'Gua Sha Lift Facial',
        duration: '60 min',
        price: '$155',
        description: 'Cold-stone gua sha and lymphatic drainage for de-puffing and contour.',
      },
      {
        name: 'Express Glow',
        duration: '30 min',
        price: '$85',
        description: 'A quick cleanse-exfoliate-hydrate reset — built for a lunch break.',
      },
      {
        name: 'Back Facial',
        duration: '45 min',
        price: '$120',
        description: 'The facial treatment your back never gets: extractions, mask, and massage.',
      },
    ],
  },
  {
    id: 'bodywork',
    title: 'Body Work & Add-Ons',
    intro: 'Small additions that change how a session feels, without changing the price of admission much.',
    items: [
      {
        name: 'Dry Brush & Rebounding Ritual',
        duration: '45 min',
        price: '$110',
        description: 'Dry brushing, a warm rinse, and light rebounding to move circulation before a massage.',
      },
      {
        name: 'Hot Stone Add-On',
        duration: '+15 min',
        price: '+$25',
        description: 'Adds heated basalt stones to any massage.',
      },
      {
        name: 'Cupping Add-On',
        duration: '+15 min',
        price: '+$30',
        description: 'Targeted cupping for the upper back and shoulders.',
      },
    ],
  },
]

export const membership = {
  name: 'The Steady',
  price: '$119/month',
  bullets: [
    'One 50-minute massage or facial every month',
    '15% off additional visits and retail',
    'No long-term contract — pause or cancel anytime',
    'Unused visits roll over one month',
  ],
}

export const faqs = [
  {
    q: 'I have never had a massage or facial here before — what should I expect?',
    a: 'Every first visit starts with a five-minute intake: what you want out of the session, anything to avoid, and how much pressure or product intensity you actually like. Nothing is upsold during your treatment — if we think an add-on would help, we mention it once, at the end.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'Free cancellation or reschedule up to 24 hours before your appointment. Inside 24 hours, we charge 50% of the service price to hold space for the next guest.',
  },
  {
    q: 'Is the membership a long-term commitment?',
    a: 'No. The Steady is month-to-month — pause or cancel anytime from your client portal, no phone call or fee required.',
  },
  {
    q: 'Do you treat pregnancy, injuries, or chronic pain?',
    a: 'Yes. Let us know during booking or in the intake form so your therapist can adjust positioning and pressure — prenatal massage is side-lying and pillow-supported at every stage.',
  },
  {
    q: 'Is parking available?',
    a: 'Free street parking along Herman Ave and the adjacent side streets. We are a five-minute walk from the University Ave shops.',
  },
  {
    q: 'What should I do before a facial or massage?',
    a: 'Arrive a few minutes early to fill out your intake if it is your first visit, skip retinol or exfoliating products for 48 hours before a facial, and avoid a heavy meal right before a massage.',
  },
]
