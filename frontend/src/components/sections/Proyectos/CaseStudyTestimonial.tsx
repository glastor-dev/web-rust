import { Quote } from 'lucide-react';
import type { CaseStudy } from '@/lib/data/caseStudies';

interface CaseStudyTestimonialProps {
  testimonial: NonNullable<CaseStudy['testimonial']>;
}

export function CaseStudyTestimonial({ testimonial }: CaseStudyTestimonialProps) {
  return (
    <div className="mt-20 glass-panel p-8 md:p-12 border-editorial relative overflow-hidden group">
      <div className="absolute -top-12 -right-12 text-white/5 rotate-12 group-hover:text-brand/5 transition-colors duration-700">
        <Quote size={200} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <Quote className="w-8 h-8 text-brand mx-auto mb-6" />
        <p className="text-xl md:text-3xl font-medium text-white italic leading-relaxed mb-8">
          "{testimonial.quote}"
        </p>
        <div className="flex flex-col items-center justify-center gap-1">
          <span className="text-brand font-bold uppercase tracking-widest font-mono text-sm">
            {testimonial.author}
          </span>
          <span className="text-zinc-400 text-sm">{testimonial.role}</span>
        </div>
      </div>
    </div>
  );
}
