import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import * as FileSystem from 'expo-file-system';
import { PDFDocument } from 'pdf-lib';
import { PDFFile, PDFDocument as PDFDocumentType } from '../../types/pdf';
import { COLORS, SPACING } from '../../constants/theme';
import { getPDFInfo } from '../../utils/pdfProcessor';
import Button from '../common/Button';

interface PDFViewerProps {
  file: PDFFile;
  initialPage?: number;
  onPageChange?: (pageNumber: number) => void;
  renderPageControls?: boolean;
  maxHeight?: number | string;
  width?: number | string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({
  file,
  initialPage = 1,
  onPageChange,
  renderPageControls = true,
  maxHeight = 500,
  width = '100%',
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pdfInfo, setPdfInfo] = useState<PDFDocumentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageImages, setPageImages] = useState<{ [key: number]: string }>({});
  
  // Load PDF information
  useEffect(() => {
    const loadPDF = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const info = await getPDFInfo(file);
        setPdfInfo(info);
        
        // Generate image for the initial page
        await generatePageImage(initialPage);
        
        setLoading(false);
      } catch (err) {
        console.error('Error loading PDF:', err);
        setError('Failed to load PDF. Please try again.');
        setLoading(false);
      }
    };
    
    loadPDF();
  }, [file]);
  
  // Generate an image for a specific page
  const generatePageImage = async (pageNumber: number) => {
    try {
      // Check if we already have this page image
      if (pageImages[pageNumber]) {
        return;
      }
      
      // This is a placeholder for actual PDF page rendering
      // In a real implementation, we would use a library like pdf.js or react-native-pdf
      // to render the PDF page to an image
      
      // For now, we'll use a placeholder image
      const placeholderUri = `${FileSystem.cacheDirectory}pdf_page_${pageNumber}_${Date.now()}.png`;
      
      // In a real implementation, this would be where we render the PDF page to an image
      // For now, we'll just set a placeholder
      setPageImages(prev => ({
        ...prev,
        [pageNumber]: placeholderUri,
      }));
      
    } catch (err) {
      console.error('Error generating page image:', err);
      setError('Failed to render PDF page. Please try again.');
    }
  };
  
  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (!pdfInfo) return;
    
    // Ensure page number is within bounds
    if (newPage < 1) {
      newPage = 1;
    } else if (newPage > pdfInfo.pageCount) {
      newPage = pdfInfo.pageCount;
    }
    
    setCurrentPage(newPage);
    
    // Generate image for the new page
    generatePageImage(newPage);
    
    // Notify parent component
    if (onPageChange) {
      onPageChange(newPage);
    }
  };
  
  // Render loading state
  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={COLORS.primary.DEFAULT} />
        <Text style={styles.loadingText}>Loading PDF...</Text>
      </View>
    );
  }
  
  // Render error state
  if (error || !pdfInfo) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error || 'Failed to load PDF'}</Text>
        <Button 
          title="Retry" 
          onPress={() => setPdfInfo(null)} 
          variant="primary"
          size="small"
          style={styles.retryButton}
        />
      </View>
    );
  }
  
  // Calculate dimensions based on the PDF page
  const page = pdfInfo.pages[currentPage - 1];
  const screenWidth = Dimensions.get('window').width;
  const availableWidth = typeof width === 'string' ? screenWidth * 0.9 : width;
  const aspectRatio = page.width / page.height;
  const calculatedHeight = availableWidth / aspectRatio;
  const finalHeight = Math.min(
    typeof maxHeight === 'string' ? parseInt(maxHeight) : maxHeight,
    calculatedHeight
  );
  
  return (
    <View style={styles.container}>
      <ScrollView 
        style={[styles.pdfContainer, { maxHeight: finalHeight }]}
        contentContainerStyle={styles.pdfContentContainer}
      >
        <Image
          source={pageImages[currentPage] || require('../../assets/images/pdf-placeholder.png')}
          style={[
            styles.pdfPage,
            {
              width: availableWidth,
              height: calculatedHeight,
              maxHeight: finalHeight,
            },
          ]}
          contentFit="contain"
        />
      </ScrollView>
      
      {renderPageControls && pdfInfo.pageCount > 1 && (
        <View style={styles.pageControls}>
          <Button
            title="Previous"
            onPress={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            variant="outline"
            size="small"
          />
          
          <Text style={styles.pageIndicator}>
            {currentPage} / {pdfInfo.pageCount}
          </Text>
          
          <Button
            title="Next"
            onPress={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pdfInfo.pageCount}
            variant="outline"
            size="small"
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  loadingText: {
    marginTop: SPACING.md,
    color: COLORS.text.DEFAULT,
    fontSize: 16,
  },
  errorText: {
    color: COLORS.error.DEFAULT,
    fontSize: 16,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: SPACING.md,
  },
  pdfContainer: {
    width: '100%',
    backgroundColor: COLORS.background.light,
  },
  pdfContentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.sm,
  },
  pdfPage: {
    backgroundColor: COLORS.background.DEFAULT,
  },
  pageControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.md,
    paddingHorizontal: SPACING.sm,
  },
  pageIndicator: {
    fontSize: 16,
    color: COLORS.text.DEFAULT,
    fontWeight: '500',
  },
});

export default PDFViewer;
