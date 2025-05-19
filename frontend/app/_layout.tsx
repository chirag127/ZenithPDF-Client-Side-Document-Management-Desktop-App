import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSettingsStore } from '../store/settingsStore';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ensureDirectoriesExist, cleanupTempFiles } from '../utils/fileUtils';

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
  const { loadSettings } = useSettingsStore();
  
  useEffect(() => {
    // Load settings from secure storage
    loadSettings();
    
    // Ensure app directories exist
    ensureDirectoriesExist().catch(error => {
      console.error('Error ensuring directories exist:', error);
    });
    
    // Clean up temporary files
    cleanupTempFiles().catch(error => {
      console.error('Error cleaning up temporary files:', error);
    });
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tools)/merge-pdf"
          options={{
            title: 'Merge PDF',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="(tools)/split-pdf"
          options={{
            title: 'Split PDF',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="(tools)/remove-pages"
          options={{
            title: 'Remove Pages',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="(tools)/extract-pages"
          options={{
            title: 'Extract Pages',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="(tools)/organize-pages"
          options={{
            title: 'Organize Pages',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="(tools)/rotate-pdf"
          options={{
            title: 'Rotate PDF',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="(tools)/add-page-numbers"
          options={{
            title: 'Add Page Numbers',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="(tools)/add-watermark"
          options={{
            title: 'Add Watermark',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="(tools)/image-to-pdf"
          options={{
            title: 'Image to PDF',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="(tools)/pdf-to-image"
          options={{
            title: 'PDF to Image',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="(tools)/unlock-pdf"
          options={{
            title: 'Unlock PDF',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="(tools)/protect-pdf"
          options={{
            title: 'Protect PDF',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="(tools)/compress-pdf"
          options={{
            title: 'Compress PDF',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="(tools)/chat-with-pdf"
          options={{
            title: 'Chat with PDF',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="(tools)/summarize-pdf"
          options={{
            title: 'Summarize PDF',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="settings"
          options={{
            title: 'Settings',
            headerBackTitle: 'Back',
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
