import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#123C2D" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#123C2D',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'ECOBAZAR Express',
          }}
        />
      </Stack>
    </>
  );
}
