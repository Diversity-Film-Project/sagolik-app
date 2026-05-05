import InfoCard from '@/components/InfoCard'

export default function FeaturesPage() {
    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
            }}
        >
            <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>Features</h1>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '16px',
                    width: '100%',
                    maxWidth: '500px',
                    marginTop: '20px',
                }}
            >
                <InfoCard
                    title="AI Story Generator"
                    description="Create your personalized stories using AI"
                />

                <InfoCard
                    title="Photo Upload"
                    description="Upload images for your stories"
                />
            </div>
        </div>
    )
}
