// app/registro1.tsx
import React from 'react';
import PantallaRegistro1 from '@/componentes/PantallaRegistro1';
import { useRouter } from 'expo-router';

export default function Registro1Screen() {
    const router = useRouter();

    const handleNext = () => {
        // Podrías hacer: router.push('/registro2')
        // o lo que necesites
        //router.push('/registro2');
    };

    return (
        <PantallaRegistro1 onNext={handleNext} />
    );
}
