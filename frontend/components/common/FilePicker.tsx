import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE } from '../../constants/theme';
import { PDFFile } from '../../types/pdf';
import { pickPDFFile, pickMultiplePDFFiles, pickImageFiles, getFormattedFileSize } from '../../utils/fileUtils';

interface FilePickerProps {
  onFilePicked: (file: PDFFile | PDFFile[]) => void;
  type?: 'pdf' | 'image' | 'any';
  multiple?: boolean;
  label?: string;
  placeholder?: string;
  selectedFiles?: PDFFile[];
  error?: string;
}

const FilePicker: React.FC<FilePickerProps> = ({
  onFilePicked,
  type = 'pdf',
  multiple = false,
  label = 'Select File',
  placeholder = 'Tap to select a file',
  selectedFiles = [],
  error,
}) => {
  const handlePickFile = async () => {
    try {
      let result;
      
      if (type === 'pdf' && multiple) {
        result = await pickMultiplePDFFiles();
        if (result.length > 0) {
          onFilePicked(result);
        }
      } else if (type === 'pdf' && !multiple) {
        result = await pickPDFFile();
        if (result) {
          onFilePicked(result);
        }
      } else if (type === 'image') {
        result = await pickImageFiles();
        if (result.length > 0) {
          onFilePicked(multiple ? result : result[0]);
        }
      }
      // Add more file type handlers as needed
      
    } catch (error) {
      console.error('Error picking file:', error);
    }
  };
  
  const renderSelectedFiles = () => {
    if (selectedFiles.length === 0) {
      return (
        <Text style={styles.placeholder}>{placeholder}</Text>
      );
    }
    
    return (
      <View style={styles.selectedFilesContainer}>
        {selectedFiles.map((file, index) => (
          <View key={`${file.uri}-${index}`} style={styles.fileItem}>
            <Image 
              source={file.mimeType.includes('pdf') 
                ? require('../../assets/images/pdf-icon.png') 
                : require('../../assets/images/image-icon.png')} 
              style={styles.fileIcon} 
            />
            <View style={styles.fileDetails}>
              <Text style={styles.fileName} numberOfLines={1} ellipsizeMode="middle">
                {file.name}
              </Text>
              <Text style={styles.fileSize}>
                {getFormattedFileSize(file.size)}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TouchableOpacity
        style={[
          styles.pickerContainer,
          error ? styles.errorBorder : null,
        ]}
        onPress={handlePickFile}
        activeOpacity={0.7}
      >
        {renderSelectedFiles()}
      </TouchableOpacity>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '500',
    marginBottom: SPACING.xs,
    color: COLORS.text.DEFAULT,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.gray[300],
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    backgroundColor: COLORS.background.light,
    minHeight: 60,
  },
  placeholder: {
    color: COLORS.gray[500],
    fontSize: FONT_SIZE.sm,
  },
  selectedFilesContainer: {
    width: '100%',
  },
  fileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  fileIcon: {
    width: 24,
    height: 24,
    marginRight: SPACING.sm,
  },
  fileDetails: {
    flex: 1,
  },
  fileName: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.DEFAULT,
    fontWeight: '500',
  },
  fileSize: {
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray[500],
  },
  errorBorder: {
    borderColor: COLORS.error.DEFAULT,
  },
  errorText: {
    color: COLORS.error.DEFAULT,
    fontSize: FONT_SIZE.xs,
    marginTop: SPACING.xs,
  },
});

export default FilePicker;
