import styles from './Modal.module.css'

interface ModalProps {
    onClose: () => void
    children: React.ReactNode
}

export function Modal({ onClose, children }: ModalProps) {
    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
