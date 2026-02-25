/**
 * Landing Page Data Configuration
 * 
 * This file contains all the static content and structure for the GearX Bangladesh landing page.
 * It includes header, hero carousel, categories, products, brands, and footer information.
 * 
 * Updated: October 21, 2025
 */

export const landingPageData = {
  meta: {
    title: "GearX Bangladesh — Helmets & Bike Accessories",
    description: "Shop premium helmets, riding gear, and bike accessories in Bangladesh at GearX.",
    lang: "en-US"
  },
  
  header: {
    topbar: {
      welcomeText: "Welcome to GearX Bangladesh",
      links: [
        { label: "GearX Bangladesh Warranty Policy", href: "#" },
        { label: "Authorized Dealer List", href: "#" },
        { label: "My account", href: "/account" }
      ],
      support: {
        icon: "headset",
        phone: "+88-01789-881111",
        email: "info@gearxbd.com"
      }
    },
    
    navbar: {
      logo: {
        src: "/images/gearx-logo.png",
        alt: "GearX Bangladesh"
      },
      menu: [
        { label: "HOME", href: "/" },
        {
          label: "ABOUT US", dropdown: [
            { label: "Our Story", href: "/about" },
            { label: "Our Team", href: "/team" }
          ]
        },
        { label: "TIPS & TRICKS", href: "/tips" },
        { label: "NEWS & UPDATES", href: "/news" },
        { label: "BECOME A DEALER", href: "/dealer" },
        { label: "CONTACT US", href: "/contact" }
      ],
      actions: {
        productDropdown: "OUR PRODUCTS",
        searchPlaceholder: "Search for Products",
        categoryFilter: "All Categories",
        icons: ["search", "refresh", "wishlist", "cart"]
      }
    }
  },

  heroCarousel: {
    id: "heroCarousel",
    type: "carousel",
    autoplay: true,
    intervalMs: 5000,
    slides: [
      {
        image: "/images/banner1.jpg",
        alt: "Rider wearing GearX helmet",
        headline: "Ride Safe, Ride Smart",
        subtext: "Premium helmets and accessories built for your safety",
        cta: { label: "Shop Now", href: "/shop" }
      },
      {
        image: "/images/banner2.jpg",
        alt: "Bike accessories on display",
        headline: "Accessories for Every Rider",
        subtext: "From gloves to guards — explore our latest collection",
        cta: { label: "Explore", href: "/accessories" }
      }
    ]
  },

  categories: {
    id: "categories",
    title: "Shop by Category",
    layout: "grid",
    gridSettings: { columns: { desktop: 4, mobile: 2 } },
    items: [
      { label: "Helmets", image: "/images/categories/helmets.jpg", href: "/c/helmets" },
      { label: "Riding Gears", image: "/images/categories/riding-gears.jpg", href: "/c/gears" },
      { label: "Rain Gear", image: "/images/categories/rain-gear.jpg", href: "/c/rain" },
      { label: "Accessories", image: "/images/categories/accessories.jpg", href: "/c/accessories" }
    ]
  },

  featuredProducts: {
    id: "featuredProducts",
    title: "Featured Products",
    gridSettings: { columns: { desktop: 4, tablet: 2, mobile: 1 } },
    products: [
      {
        id: "helmet-001",
        title: "GearX Pro Helmet",
        price: 12500.0,
        currency: "BDT",
        image: "/images/products/helmet1.jpg",
        rating: 4.8
      },
      {
        id: "glove-101",
        title: "Rider Gloves Black Edition",
        price: 4500.0,
        currency: "BDT",
        image: "/images/products/glove1.jpg",
        rating: 4.6
      },
      {
        id: "lock-202",
        title: "Anti-Theft Bike Lock",
        price: 6500.0,
        currency: "BDT",
        image: "/images/products/lock1.jpg",
        rating: 4.4
      },
      {
        id: "jacket-303",
        title: "Windproof Riding Jacket",
        price: 18900.0,
        currency: "BDT",
        image: "/images/products/jacket1.jpg",
        rating: 4.9
      }
    ]
  },

  newProducts: {
    id: "newProducts",
    title: "New Arrivals",
    subtitle: "Fresh gear for your next ride",
    products: [
      {
        id: "helmet-010",
        title: "Urban Matte Helmet",
        price: 9900.0,
        currency: "BDT",
        image: "/images/products/helmet2.jpg"
      },
      {
        id: "boot-110",
        title: "Rider Boots X1",
        price: 12000.0,
        currency: "BDT",
        image: "/images/products/boot1.jpg"
      },
      {
        id: "visor-210",
        title: "Anti-Fog Visor",
        price: 3500.0,
        currency: "BDT",
        image: "/images/products/visor1.jpg"
      },
      {
        id: "light-310",
        title: "Rear Safety Light",
        price: 2500.0,
        currency: "BDT",
        image: "/images/products/light1.jpg"
      }
    ]
  },

  brands: {
    id: "brands",
    title: "Our Brands",
    layout: "carousel",
    autoplay: true,
    items: [
      { name: "LS2", logo: "/images/brands/ls2.png" },
      { name: "AGV", logo: "/images/brands/agv.png" },
      { name: "MT", logo: "/images/brands/mt.png" },
      { name: "Shoei", logo: "/images/brands/shoei.png" },
      { name: "HJC", logo: "/images/brands/hjc.png" }
    ]
  },

  footer: {
    id: "footer",
    logo: "/images/gearx-logo.png",
    support: {
      headline: "Got Questions? Call us 24/7!",
      phone: "+88-01789-881111",
      address: "House – 183/8, Pirerbag (60 feet Road), Mirpur, Dhaka, Bangladesh",
      socials: [
        { icon: "facebook", href: "https://facebook.com/gearx" },
        { icon: "instagram", href: "https://instagram.com/gearx" },
        { icon: "youtube", href: "https://youtube.com/gearx" }
      ]
    },
    columns: [
      {
        title: "Find It Fast",
        links: [
          { label: "Helmets", href: "/c/helmets" },
          { label: "Riding Gears", href: "/c/gears" },
          { label: "Rain Gear", href: "/c/rain" }
        ]
      },
      {
        title: "Quick Links",
        links: [
          { label: "About Us", href: "/about" },
          { label: "My Account", href: "/account" },
          { label: "Terms and Conditions", href: "/terms" },
          { label: "Contact Us", href: "/contact" },
          { label: "Warranty Policy", href: "/warranty-policy" }
        ]
      }
    ],
    copyright: "© GearX Bangladesh - All Rights Reserved"
  }
};

export default landingPageData;
