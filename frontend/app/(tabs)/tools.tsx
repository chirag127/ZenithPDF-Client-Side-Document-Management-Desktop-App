import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, BORDER_RADIUS, FONT_SIZE } from '../../constants/theme';
import { TOOLS } from '../../constants/index';
import { Tool, ToolCategory } from '../../types';
import Card from '../../components/common/Card';

export default function ToolsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all');
  
  // Get unique categories
  const categories: (ToolCategory | 'all')[] = ['all', ...new Set(TOOLS.map(tool => tool.category))];
  
  // Filter tools based on search query and selected category
  const filteredTools = TOOLS.filter(tool => 
    tool.isAvailable && 
    (selectedCategory === 'all' || tool.category === selectedCategory) &&
    (tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     tool.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  // Group tools by category
  const groupedTools = filteredTools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<ToolCategory, Tool[]>);
  
  // Navigate to a tool
  const navigateToTool = (tool: Tool) => {
    router.push(tool.route);
  };
  
  // Render a tool card
  const renderToolCard = (tool: Tool) => (
    <TouchableOpacity
      key={tool.id}
      style={styles.toolCard}
      onPress={() => navigateToTool(tool)}
      activeOpacity={0.7}
    >
      <Card padding="medium" elevation="small">
        <View style={styles.toolCardContent}>
          <View style={[styles.toolIcon, { backgroundColor: getCategoryColor(tool.category) }]}>
            <Ionicons name={getIconName(tool.icon)} size={24} color="white" />
          </View>
          <Text style={styles.toolName}>{tool.name}</Text>
          <Text style={styles.toolDescription} numberOfLines={2}>
            {tool.description}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
  
  // Get category color
  const getCategoryColor = (category: ToolCategory) => {
    switch (category) {
      case 'organization':
        return COLORS.primary.DEFAULT;
      case 'conversion':
        return COLORS.secondary.DEFAULT;
      case 'editing':
        return COLORS.accent.DEFAULT;
      case 'security':
        return '#9333EA'; // Purple
      case 'enhancement':
        return '#EC4899'; // Pink
      case 'ai':
        return '#10B981'; // Green
      default:
        return COLORS.primary.DEFAULT;
    }
  };
  
  // Get category name
  const getCategoryName = (category: ToolCategory | 'all') => {
    switch (category) {
      case 'organization':
        return 'Organization';
      case 'conversion':
        return 'Conversion';
      case 'editing':
        return 'Editing';
      case 'security':
        return 'Security';
      case 'enhancement':
        return 'Enhancement';
      case 'ai':
        return 'AI';
      case 'all':
        return 'All';
      default:
        return category;
    }
  };
  
  // Get icon name
  const getIconName = (iconKey: string): any => {
    // Map icon keys to Ionicons names
    const iconMap: { [key: string]: string } = {
      'merge': 'git-merge-outline',
      'split': 'cut-outline',
      'delete': 'trash-outline',
      'extract': 'copy-outline',
      'organize': 'albums-outline',
      'image-to-pdf': 'image-outline',
      'pdf-to-image': 'document-outline',
      'office-to-pdf': 'document-text-outline',
      'pdf-to-office': 'document-attach-outline',
      'rotate': 'refresh-outline',
      'page-numbers': 'list-outline',
      'watermark': 'water-outline',
      'crop': 'crop-outline',
      'add-content': 'add-circle-outline',
      'unlock': 'lock-open-outline',
      'protect': 'lock-closed-outline',
      'sign': 'pencil-outline',
      'redact': 'eye-off-outline',
      'compress': 'archive-outline',
      'repair': 'hammer-outline',
      'ocr': 'text-outline',
      'scan': 'scan-outline',
      'compare': 'git-compare-outline',
      'chat': 'chatbubble-outline',
      'summarize': 'reader-outline',
      'translate': 'language-outline',
      'questions': 'help-circle-outline',
    };
    
    return iconMap[iconKey] || 'document-outline';
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color={COLORS.gray[500]} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for tools..."
          placeholderTextColor={COLORS.gray[500]}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={20} color={COLORS.gray[500]} />
          </TouchableOpacity>
        )}
      </View>
      
      {/* Category Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map(category => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryTab,
              selectedCategory === category && styles.selectedCategoryTab,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {getCategoryName(category)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Tools Grid or Categories */}
      {selectedCategory === 'all' && searchQuery.length === 0 ? (
        // Show tools grouped by category
        Object.entries(groupedTools).map(([category, tools]) => (
          <View key={category} style={styles.section}>
            <Text style={styles.sectionTitle}>{getCategoryName(category as ToolCategory)}</Text>
            <View style={styles.toolsGrid}>
              {tools.map(renderToolCard)}
            </View>
          </View>
        ))
      ) : (
        // Show filtered tools
        <View style={styles.section}>
          {filteredTools.length > 0 ? (
            <View style={styles.toolsGrid}>
              {filteredTools.map(renderToolCard)}
            </View>
          ) : (
            <Text style={styles.noResults}>No tools found matching your criteria</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background.DEFAULT,
  },
  contentContainer: {
    padding: SPACING.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background.light,
    borderRadius: BORDER_RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginBottom: SPACING.md,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FONT_SIZE.md,
    color: COLORS.text.DEFAULT,
  },
  categoriesContainer: {
    marginBottom: SPACING.md,
  },
  categoriesContent: {
    paddingRight: SPACING.md,
  },
  categoryTab: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    marginRight: SPACING.sm,
    backgroundColor: COLORS.background.light,
  },
  selectedCategoryTab: {
    backgroundColor: COLORS.primary.DEFAULT,
  },
  categoryText: {
    fontSize: FONT_SIZE.sm,
    fontWeight: '500',
    color: COLORS.text.DEFAULT,
  },
  selectedCategoryText: {
    color: 'white',
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '600',
    color: COLORS.text.DEFAULT,
    marginBottom: SPACING.md,
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  toolCard: {
    width: '48%',
    marginBottom: SPACING.md,
  },
  toolCardContent: {
    alignItems: 'center',
  },
  toolIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  toolName: {
    fontSize: FONT_SIZE.md,
    fontWeight: '600',
    color: COLORS.text.DEFAULT,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  toolDescription: {
    fontSize: FONT_SIZE.sm,
    color: COLORS.text.light,
    textAlign: 'center',
  },
  noResults: {
    fontSize: FONT_SIZE.md,
    color: COLORS.text.light,
    textAlign: 'center',
    marginTop: SPACING.lg,
  },
});
