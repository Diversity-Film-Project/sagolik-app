import { Modal } from '@/components/ui/Modal/Modal'
import { Button } from '@/components/ui/Button/Button'
import styles from './ConfirmModal.module.css'

interface ConfirmModalProps {
    title: string
    children: React.ReactNode
    confirmLabel?: string
    cancelLabel?: string
    onConfirm: () => void
    onCancel: () => void
}

export function ConfirmModal({
    title,
    children,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm,
    onCancel,
}: ConfirmModalProps) {
    return (
        <Modal onClose={onCancel}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.body}>{children}</div>
            <div className={styles.actions}>
                <Button label={confirmLabel} onClick={onConfirm} />
                <Button
                    label={cancelLabel}
                    variant="secondary"
                    onClick={onCancel}
                />
            </div>
        </Modal>
    )
}
