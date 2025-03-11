// app/registro2.tsx
import React from 'react';
import PantallaRegistro2 from '@/componentes/PantallaRegistro2';
import { useRouter } from 'expo-router';

export default function Registro2Screen() {
    const router = useRouter();

    const handleFinish = () => {
        // Aquí podrías terminar el registro
        // y navegar a otra pantalla o a la pantalla principal
        // por ejemplo:
        router.push('/');
    };

    return (
        <PantallaRegistro2 onFinish={handleFinish} />
    );
}
