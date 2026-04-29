import React from 'react'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import styles from './Accordion.module.css'

interface AccordionProps {
    title: string
    content: React.ReactNode
}

export function Accordion({ title, content }: AccordionProps) {
    const [isOpen, setIsOpen] = useState(false)

    const toggleAccordion = () => {
        setIsOpen(!isOpen)
    }

    return (
        <details className={styles.accordion} open>
            <summary
                className={styles.accordionSummary}
                onClick={(e) => {
                    e.preventDefault()
                    toggleAccordion()
                }}
            >
                {title}
                <ChevronDown
                    className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}
                />
            </summary>
            <div
                className={`${styles.accordionContent} ${isOpen ? styles.accordionContentOpen : ''}`}
            >
                <div className={styles.accordionInner}>{content}</div>
            </div>
        </details>
    )
}
