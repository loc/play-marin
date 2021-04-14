import { useRouter } from 'next/router'

export default function Program() {
    const router = useRouter()
    const { program } = router.query

    console.log(router)
    
    return (
        
        <div>
            Program: {program}
        </div>
    )
}
