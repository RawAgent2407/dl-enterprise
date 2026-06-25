export interface Category {
  id: string;
  title: string;
  slug: string;
  image?: {
    url: string;
  }
}

export interface VariantValue {
  id: number;
  value: string;
}

export interface Variant {
  id: number;
  type: string;
  values: VariantValue[];
}

export const Links = {
  home: "/",
  legal: "/privacy-cookies",
  about: "/about-us",
  categories: "/categories",
  contact: "/contact-us",
  warranty: "/warranty-conditions",
  terms: "/general-terms",
  catalogue: "https://drive.google.com/file/d/1E9cvwhsgCtO53MkM90gqhIxyP-VTSUuE/view?usp=drivesdk",
  instagram: "https://www.instagram.com/dl_enterprise_/",
  twitterX: "https://twitter.com/dl_enterprise_",
  facebook: "https://www.facebook.com/dlenterprise",
  linkdin: "https://www.linkedin.com/company/dl-enterprise/"
}

export const CONTACT_DETAILS = {
  email: {
    label: "Email",
    value: "info@dlent04.com",
    link: "mailto:info@dlent04.com"
  },
  phone: {
    label: "Phone",
    value: "+91-94260-51745",
    link: "tel:+919426051745"
  },
  address: {
    label: "Address",
    value: "78, near Ambica Tubemill Compund,\nGajanand Induistrial Park,\nVatva, Ahmedabad,\nGujarat 382445",
    link: "https://www.google.com/maps?q=78,+near+Ambica+Tubemill+Compund,+Gajanand+Induistrial+Park,+Vatva,+Ahmedabad,+Gujarat+382445"
  },
  time: {
    label: "Working Hours",
    value: "10 AM to 7 PM",
    link: null
  }
}

export const FooterLinks = {
  Products: [
    { name: "Product 1", href: "#" },
    { name: "Product 2", href: "#" },
    { name: "Product 3", href: "#" },
    { name: "Product 4", href: "#" },
  ],
  "Quick Links": [
    { name: "About Us", href: Links.about },
    { name: "Contact", href: Links.contact },
    { name: "Privacy Policy", href: Links.legal },
    { name: "Terms of Service", href: Links.terms },
    { name: "Warranty Conditions", href: Links.warranty }
  ],
}

