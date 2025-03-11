// app/_layout.tsx
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Rutas: index.tsx, puerta.tsx, etc. */}
      <Stack.Screen name="puerta" />
      <Stack.Screen name="empresa" />
    </Stack>
  );
}

//<Stack.Screen name="index" />
