import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function Transition({children}) {

  const router = useRouter();
  const key = router.query.slug ? router.query.slug.join('') : '';

  let varients = {
    hidden: {
      '--blur': '3px',
      opacity: 0,
      filter: 'blur(var(--blur))',
    },
    visible: {
      '--blur': '0px',
      opacity: 1,
      filter: 'blur(var(--blur))',
      transition: {
        ease: 'easeIn',
        duration: .15
      }
    },
    exit: {
      '--blur': '3px',
      opacity: 0,
      filter: 'blur(var(--blur))',
      transition: {
        ease: 'easeInOut',
        duration: .15
      }
    }
  }

  return(
    <AnimatePresence exitBeforeEnter>
      <motion.div key={key} initial="hidden" animate="visible" exit="exit" variants={varients}>
        {children}
      </motion.div>
    </AnimatePresence>
  )

}
