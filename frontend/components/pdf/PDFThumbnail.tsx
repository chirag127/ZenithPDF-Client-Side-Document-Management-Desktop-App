import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { COLORS, SPACING, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { PDFPage } from '../../types/pdf';

interface PDFThumbnailProps {
  page: PDFPage;
  onPress?: (page: PDFPage) => void;
  onLongPress?: (page: PDFPage) => void;
  selected?: boolean;
  selectable?: boolean;
  showPageNumber?: boolean;
  width?: number;
  height?: number;
  style?: any;
}

const PDFThumbnail: React.FC<PDFThumbnailProps> = ({
  page,
  onPress,
  onLongPress,
  selected = false,
  selectable = false,
  showPageNumber = true,
  width = 120,
  height = 160,
  style,
}) => {
  const handlePress = () => {
    if (onPress) {
      onPress(page);
    }
  };
  
  const handleLongPress = () => {
    if (onLongPress) {
      onLongPress(page);
    }
  };
  
  // Calculate aspect ratio based on page dimensions
  const aspectRatio = page.width / page.height;
  const calculatedHeight = width / aspectRatio;
  
  // Use provided height or calculated height based on aspect ratio
  const thumbnailHeight = height || calculatedHeight;
  
  // Placeholder image if no thumbnail URI is available
  const placeholderImage = require('../../assets/images/pdf-placeholder.png');
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { width, height: thumbnailHeight },
        selected && styles.selected,
        style,
      ]}
      onPress={handlePress}
      onLongPress={handleLongPress}
      activeOpacity={0.7}
      disabled={!onPress && !onLongPress}
    >
      <View style={styles.thumbnailContainer}>
        <Image
          source={page.thumbnailUri ? { uri: page.thumbnailUri } : placeholderImage}
          style={styles.thumbnail}
          contentFit="cover"
          transition={200}
        />
        
        {showPageNumber && (
          <View style={styles.pageNumberContainer}>
            <Text style={styles.pageNumber}>{page.pageNumber}</Text>
          </View>
        )}
        
        {selectable && selected && (
          <View style={styles.selectedOverlay}>
            <View style={styles.checkmark}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: SPACING.xs,
    ...SHADOWS.sm,
  },
  thumbnailContainer: {
    width: '100%',
    height: '100%',
    borderRadius: BORDER_RADIUS.sm,
    overflow: 'hidden',
    backgroundColor: COLORS.background.light,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.gray[200],
  },
  pageNumberContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 2,
    alignItems: 'center',
  },
  pageNumber: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  selected: {
    borderWidth: 2,
    borderColor: COLORS.primary.DEFAULT,
    borderRadius: BORDER_RADIUS.sm,
  },
  selectedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default PDFThumbnail;
