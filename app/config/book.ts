export interface Coupon {
  discount: number;
  valid: boolean;
}

export interface Coupons {
  [key: string]: Coupon;
}

export const bookConfig = {
  title: "The Polymath's Path",
  author: 'Rushan Khan',
  price: {
    digital: 49,
    paperback: 699,
  },
  currency: 'INR',
  coupons: {
    GOLDENPATH: {
      discount: 100, // 100% discount
      valid: true,
    },
  } as Coupons,
  chapters: [
    {
      title: "The First Defiance — Lighting the Fire of Multiplicity",
      description: "Embark on a journey of intellectual rebellion, where we challenge the conventional wisdom of specialization and ignite the spark of multidisciplinary thinking.",
      image: "/images/chapters/chapter1.jpg"
    },
    {
      title: "The Heretic's Mirror — Questioning the One-Track Mind",
      description: "Dive deep into the art of critical thinking and learn how to break free from the constraints of single-discipline thinking.",
      image: "/images/chapters/chapter2.jpg"
    },
    {
      title: "From Fragments to Cosmos — Synthesizing the Infinite",
      description: "Discover how to weave together diverse knowledge strands into a cohesive understanding of the world around us.",
      image: "/images/chapters/chapter3.jpg"
    }
  ],
  coverImage: "/images/book-cover.jpg",
  heroImage: "/images/hero-bg.jpg",
  aboutImage: "/images/about.jpg",
  previewImage: "/images/preview-l.jpg"
}; 