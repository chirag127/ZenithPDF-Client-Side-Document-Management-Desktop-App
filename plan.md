
# Masterplan for All PDF Tools

Document Version: 1.0
Owner: Chirag Singhal
Status: final
Prepared for: augment code assistant
Prepared by: Chirag Singhal

---

## Project Overview
"All PDF Tools" is a comprehensive React Native Expo application designed to provide users with a complete suite of PDF manipulation tools directly on their mobile devices (iOS and Android). The application will function as an all-in-one PDF utility, offering features for document organization, conversion, editing, security, enhancement, and AI-powered interactions. A core principle is on-device processing for user privacy, with no server-side components or user authentication required. AI features will be powered by the Google Gemini API, requiring users to provide their own API key.

## Project Goals
- To deliver a free, comprehensive, and user-friendly suite of PDF tools for mobile users.
- To ensure all PDF processing occurs on-device, prioritizing user privacy and offline capability for most features.
- To integrate powerful AI capabilities (like "Chat with PDF" and summarization) using the Gemini API, enhancing document interaction.
- To create a stable and performant application capable of handling reasonably sized PDF files.
- To provide a modern, intuitive, and accessible user interface.

## Technical Stack
- **Frontend**: React Native with Expo SDK (latest stable version), TypeScript
- **PDF Processing Libraries**: `pdf-lib` (primary for core manipulations due to JS nature), potentially `react-native-pdf-lib` for specific native integrations or performance-critical tasks. Evaluation needed for optimal choices for each feature. Client-side OCR library (e.g., Tesseract.js adapted for React Native) to be investigated.
- **AI Integration**: Google Generative AI SDK (`@google/generative-ai`) for JavaScript.
- **State Management**: TanStack Query (for async operations like API calls), Zustand (for global UI state).
- **Styling**: NativeWind / Tamagui / UniStyles (to be decided based on developer preference and ease of use with Expo).
- **Navigation**: Expo Router.
- **Secure Storage**: Expo SecureStore (for Gemini API Key).
- **Deployment**: Expo Application Services (EAS) Build for iOS and Android app store submissions. Web deployment via Expo for Web (experimental/limited feature set).

## Project Scope
### In Scope
-   Development of a React Native Expo application for iOS and Android.
-   Implementation of all PDF tool categories: Document Organization, Conversion (prioritizing common formats), Editing (basic), Security, Enhancement, and AI Features.
-   Client-side PDF processing for all core manipulation tools.
-   Integration with Gemini API for AI features, requiring user-provided API key.
-   User interface for managing Gemini API key and model selection.
-   File picking from device storage and saving modified PDFs back to device.
-   Progress indicators for long-running operations.
-   Error handling for PDF processing and API interactions.
-   Basic accessibility features (aiming for WCAG 2.1 Level AA).
-   Support for PDF files up to 100MB (with performance considerations).

### Out of Scope
-   User authentication or account management.
-   Backend server and cloud storage for PDF files or user data.
-   Full feature parity for Expo Web if it significantly complicates mobile development or is unfeasible for certain client-side operations (Web support is secondary).
-   Advanced PDF editing features beyond adding new text/images or basic annotations.
-   Complex Office document conversions (e.g., DOCX to PDF, PDF to DOCX) in the initial version if client-side implementation proves too unstable or resource-intensive. These may be deferred or marked experimental.
-   PKI-based digital signatures (complex cryptographic signatures).

## Functional Requirements

### Feature Area 1: Document Organization
-   **FR1.1 (Merge PDF):** Allow users to select multiple PDF files and combine them into a single PDF document. Users should be able to reorder files before merging.
-   **FR1.2 (Split PDF):** Allow users to split a PDF into multiple documents by specifying page ranges or selecting individual pages to form new PDFs.
-   **FR1.3 (Remove Pages):** Allow users to select and delete specific pages from a PDF document.
-   **FR1.4 (Extract Pages):** Allow users to select specific pages from a PDF and save them as a new PDF document.
-   **FR1.5 (Organize Pages):** Provide a UI (e.g., grid view of thumbnails) for users to rearrange pages, rotate individual/selected pages, and delete pages within a single PDF document.

### Feature Area 2: Conversion Tools
-   **FR2.1 (Image to PDF):** Convert single or multiple image files (JPG, PNG, WebP, HEIC) into a PDF document. Provide options for layout, page size, and orientation.
-   **FR2.2 (PDF to Image):** Convert PDF pages to image files (JPG, PNG). Allow selection of specific pages or all pages, and image quality/resolution.
-   **FR2.3 (Office/Other to PDF - Lower Priority/Feasibility Check):**
    -   Convert Word (DOC, DOCX), PowerPoint (PPT, PPTX), Excel (XLS, XLSX) to PDF.
    -   Convert HTML, TXT, RTF, EPUB, ODT, ODG, ODS, ODP, TIFF, SVG to PDF.
    *(These are complex and client-side feasibility needs thorough investigation. Start with simpler text-based formats like TXT/HTML if Office formats are too challenging initially.)*
-   **FR2.4 (PDF to Office/Other - Lower Priority/Feasibility Check):**
    -   Convert PDF to Word (DOC, DOCX), PowerPoint (PPT, PPTX), Excel (XLSX).
    -   Convert PDF to HTML, TXT, RTF, EPUB.
    -   Convert PDF to PDF/A (archival format).
    -   Convert PDF to Secure PDF (distinct from Protect PDF, possibly applying specific security settings).
    *(Similar feasibility concerns as FR2.3. Prioritize PDF to TXT.)*

### Feature Area 3: Editing Tools
-   **FR3.1 (Rotate PDF):** Allow users to rotate all pages or selected pages in a PDF by 90°, 180°, or 270°.
-   **FR3.2 (Add Page Numbers):** Allow users to insert page numbers into a PDF. Provide options for position (header/footer, left/center/right), starting number, and format.
-   **FR3.3 (Add Watermark):** Allow users to add text or image watermarks to PDF pages. Provide options for opacity, position, rotation, and page range.
-   **FR3.4 (Crop PDF):** Allow users to adjust page margins or crop pages to a selected area.
-   **FR3.5 (Basic Text/Image Addition - Low Priority):** Allow users to add new text boxes (with basic font styling) and new images onto PDF pages. Editing existing embedded content is out of scope.

### Feature Area 4: Security Tools
-   **FR4.1 (Unlock PDF):** Allow users to remove password protection from PDF files (if they know the password).
-   **FR4.2 (Protect PDF):** Allow users to add password protection (open password and/or permissions password) to PDF files.
-   **FR4.3 (Sign PDF - Medium Priority):** Allow users to add a signature to a PDF. Support drawing a signature on the screen or typing a name to be rendered in a cursive font, then placing it on the document.
-   **FR4.4 (Redact PDF - Low Priority):** Allow users to permanently remove sensitive information by drawing redaction boxes over content.

### Feature Area 5: Enhancement Tools
-   **FR5.1 (Compress PDF):** Reduce PDF file size by optimizing images and other content. Provide options for different compression levels/quality.
-   **FR5.2 (Repair PDF - Medium Priority):** Attempt to fix common issues in corrupted or damaged PDF files to make them viewable.
-   **FR5.3 (OCR PDF - Medium Priority):** Implement client-side OCR to convert scanned PDF documents (or image-based PDFs) into PDFs with searchable and selectable text. This is crucial for AI features with scanned documents.
-   **FR5.4 (Scan to PDF - Medium Priority):** Allow users to use the device camera to capture images of documents and convert them into a PDF. Include options for edge detection, cropping, and image enhancement.
-   **FR5.5 (Compare PDF - Low Priority):** Allow users to select two PDF files and highlight the visual differences between them.

### Feature Area 6: AI Features (Gemini API Integration)
-   **FR6.1 (Chat with PDF):** Allow users to interact with the content of a PDF through a chat interface. Use Retrieval Augmented Generation (RAG) by extracting text from the PDF, chunking it, and providing relevant chunks as context to the Gemini API along with the user's query.
-   **FR6.2 (AI PDF Summarizer):** Generate concise summaries of PDF documents using the Gemini API.
-   **FR6.3 (Translate PDF - Medium Priority):** Translate the text content of a PDF to different languages using the Gemini API.
-   **FR6.4 (AI Question Generator - Low Priority):** Generate questions based on the PDF content using the Gemini API.
-   **FR6.5 (Gemini API Key Management):** Provide a settings page for users to securely enter and store their Gemini API key using Expo SecureStore.
-   **FR6.6 (Gemini Model Selection):** Allow users to select from a list of available Gemini models for AI features. Provide a default model and brief descriptions.

### Feature Area 7: General App Features
-   **FR7.1 (File Picker):** Implement a system file picker to select PDF files (and other supported formats for conversion) from device storage.
-   **FR7.2 (File Saver):** Allow users to save processed/created PDF files to device storage (default app folder with "Save As" option).
-   **FR7.3 (Progress Indication):** Display progress indicators/loaders for time-consuming operations (e.g., merging large files, OCR, AI processing).
-   **FR7.4 (Error Handling):** Implement robust error handling for file operations, PDF processing, and API calls, providing clear messages to the user.
-   **FR7.5 (Temporary File Management):** Implement mechanisms for cleaning up temporary files created during processing.
-   **FR7.6 (UI/UX):** Develop a modern, clean, professional, and intuitive UI. Navigation via a dashboard with categorized tools and a search bar.

## Non-Functional Requirements (NFR)
-   **NFR1. Performance:**
    -   The app should remain responsive during PDF processing tasks, utilizing background processing where appropriate.
    -   Operations on PDF files up to 100MB should be supported, with clear progress indication and warnings for potentially long operations.
    -   AI feature response times should be reasonable, dependent on Gemini API performance and text processing.
-   **NFR2. Scalability (Client-Side):**
    -   The app should efficiently handle an increasing number of tools without significant performance degradation in UI navigation.
    -   Codebase should be modular to allow easier addition of new PDF tools or AI features.
-   **NFR3. Usability:**
    -   Intuitive navigation: Dashboard with categorized tools and a prominent search bar.
    -   Clear feedback to the user for actions, errors, and progress.
    -   Minimal steps to accomplish common tasks.
-   **NFR4. Reliability:**
    -   The app should handle PDF processing errors gracefully and not crash.
    -   Saved files should be valid and correctly reflect the operations performed.
    -   AI feature interactions should gracefully handle API errors or unavailability.
-   **NFR5. Security (Data Privacy):**
    -   All PDF processing must occur on-device. No PDF data should be transmitted to any server other than the Gemini API for AI features (and only text content, not the file itself).
    -   Gemini API key must be stored securely using Expo SecureStore.
-   **NFR6. Maintainability:**
    -   Codebase must follow SOLID, DRY, KISS principles.
    -   Modular design with reusable components/functions.
    -   Comprehensive function-level comments and clear code structure.
    -   Use TypeScript for improved type safety and code quality.
-   **NFR7. Accessibility:**
    -   Aim for WCAG 2.1 Level AA compliance, including support for screen readers, keyboard navigation (where applicable on mobile), and sufficient color contrast.
-   **NFR8. Storage Management:**
    -   Efficient management of temporary files, with auto-cleanup and manual clear cache option.

## Project Structure
```
project-root/
├── frontend/                      # Main React Native Expo application code
│   ├── app/                       # Expo Router based navigation (screens, layouts)
│   │   ├── (tabs)/                # Example tab layout
│   │   │   ├── _layout.tsx        # Tab layout configuration
│   │   │   └── index.tsx          # Home/Dashboard screen
│   │   ├── (tools)/               # Screens for individual PDF tools
│   │   │   ├── merge-pdf.tsx
│   │   │   ├── split-pdf.tsx
│   │   │   └── ...                # Other tool screens
│   │   ├── settings.tsx           # Settings screen (API Key, Model Selection)
│   │   └── _layout.tsx            # Root layout
│   ├── assets/                    # Static assets (images, fonts, icons - generated PNGs)
│   │   ├── fonts/
│   │   └── images/
│   ├── components/                # Reusable UI components
│   │   ├── common/                # General purpose components (buttons, modals, etc.)
│   │   └── pdf/                   # PDF specific components (e.g., page thumbnail)
│   ├── constants/                 # App-wide constants (styles, themes, text strings)
│   ├── services/                  # Logic for external services (Gemini API client)
│   │   └── geminiService.ts
│   ├── store/                     # State management (Zustand stores)
│   │   └── settingsStore.ts       # Store for API key, selected model
│   ├── types/                     # TypeScript type definitions
│   │   ├── index.ts
│   │   └── pdf.ts
│   ├── utils/                     # Utility functions (file helpers, text processing for RAG)
│   │   ├── fileUtils.ts
│   │   ├── pdfProcessor.ts        # Wrapper/Abstraction for PDF library operations
│   │   └── textExtractor.ts       # For RAG
│   ├── hooks/                     # Custom React Hooks
│   ├── expo-env.d.ts              # Environment variable typing for Expo
│   └── app.json                   # Expo configuration file
├── .env                           # Local environment variables (Gitignored)
├── .env.example                   # Example environment variables template
├── babel.config.js
├── tsconfig.json
├── package.json
├── README.md
└── CHANGELOG.md
```

## Implementation Plan

This section outlines the implementation plan, including phases and tasks. Each phase will leverage the specified MCP servers for optimal problem-solving, design, and execution.

### General MCP Server Usage:
-   **context7**: Used continuously to gather context about current tasks, relevant libraries (React Native, Expo, `pdf-lib`, `@google/generative-ai`), APIs, and best practices.
-   **mentalmodel_clear_thought**: Applied for complex problem deconstruction (e.g., client-side conversion challenges, RAG implementation for "Chat with PDF"). First Principles Thinking for core PDF operations, Rubber Duck Debugging for intractable issues.
-   **designpattern_clear_thought**: Utilized for structuring the app (Modular Architecture), managing state (State Management patterns with Zustand/TanStack Query), handling asynchronous operations (Async Processing for PDF tasks and API calls), and designing AI interactions (Agentic Design Patterns for Gemini integration).
-   **programmingparadigm_clear_thought**: Primarily Functional Programming (for data transformations, utility functions) and Event-Driven Programming (for UI interactions). Object-Oriented Programming might be used for encapsulating complex PDF tool logic.
-   **debuggingapproach_clear_thought**: Systematic debugging for any issues encountered during development (Binary Search for pinpointing faulty code, Divide and Conquer for complex bugs).
-   **collaborativereasoning_clear_thought**: Simulated diverse expert (UX designer, Mobile Dev, AI specialist) inputs for feature design and problem-solving.
-   **decisionframework_clear_thought**: Used for technology choices (e.g., selecting specific PDF or OCR libraries based on criteria like performance, features, license), and prioritizing features if time constraints arise.
-   **metacognitivemonitoring_clear_thought**: Continuously assess understanding of requirements, certainty of chosen solutions, and potential biases in design or implementation choices.
-   **scientificmethod_clear_thought**: For performance testing and optimization (e.g., forming hypotheses about bottlenecks in PDF processing and designing tests to verify).
-   **structuredargumentation_clear_thought**: For evaluating different approaches to complex features (e.g., client-side DOCX to PDF conversion options).
-   **visualreasoning_clear_thought**: For UI/UX design, component structure, and data flow diagrams (especially for RAG pipeline).
-   **sequentialthinking_clear_thought**: Applied to break down each task below into manageable sub-steps, track progress, and ensure logical flow.

### Phase 1: Setup & Foundation (1-2 Weeks)
-   **Task 1.1:** Initialize React Native Expo project with TypeScript.
    -   *MCP Usage*: `sequentialthinking` for setup steps.
-   **Task 1.2:** Setup navigation using Expo Router (basic structure: Home/Dashboard, Settings).
    -   *MCP Usage*: `designpattern` for navigation patterns, `visualreasoning` for app flow.
-   **Task 1.3:** Implement UI framework/styling solution (e.g., NativeWind). Basic app theme and layout.
    -   *MCP Usage*: `decisionframework` for styling choice, `visualreasoning` for theme.
-   **Task 1.4:** Setup state management (Zustand for settings, TanStack Query for future async).
    -   *MCP Usage*: `designpattern` for state management.
-   **Task 1.5:** Implement secure storage for API Key (Expo SecureStore) and Settings screen UI for key input and model selection (no logic yet).
    -   *MCP Usage*: `designpattern` for secure storage.
-   **Task 1.6:** Basic file picker integration (expo-document-picker).
    -   *MCP Usage*: `context7` for library usage.
-   **Task 1.7:** Setup `pdf-lib` and perform a simple PoC (e.g., load a PDF, get page count).
    -   *MCP Usage*: `debuggingapproach` for any initial integration issues.

### Phase 2: Core PDF Functionality - Organization & Basic Editing (3-4 Weeks)
-   **Task 2.1:** Implement Merge PDF.
    -   *MCP Usage*: `mentalmodel` for logic, `sequentialthinking` for steps.
-   **Task 2.2:** Implement Split PDF.
    -   *MCP Usage*: `mentalmodel`, `sequentialthinking`.
-   **Task 2.3:** Implement Remove Pages & Extract Pages.
    -   *MCP Usage*: `mentalmodel`, `sequentialthinking`.
-   **Task 2.4:** Implement Organize Pages (grid view, reorder, rotate, delete). This is UI intensive.
    -   *MCP Usage*: `visualreasoning` for UI, `programmingparadigm` (Event-Driven) for interactions.
-   **Task 2.5:** Implement Rotate PDF (full document/selected pages).
    -   *MCP Usage*: `sequentialthinking`.
-   **Task 2.6:** Implement Add Page Numbers.
    -   *MCP Usage*: `designpattern` for customization options.
-   **Task 2.7:** Implement Add Watermark (text and image).
    -   *MCP Usage*: `designpattern` for options, `mentalmodel` for PDF modifications.
-   **Task 2.8:** Implement Progress indicators and error handling for all features in this phase.
    -   *MCP Usage*: `designpattern` for user feedback.

### Phase 3: Conversion & Security Tools (3-4 Weeks)
-   **Task 3.1:** Implement Image to PDF (JPG, PNG, WebP, HEIC).
    -   *MCP Usage*: `context7` for image libraries, `mentalmodel` for conversion logic.
-   **Task 3.2:** Implement PDF to Image (JPG, PNG).
    -   *MCP Usage*: `mentalmodel`.
-   **Task 3.3:** Implement Unlock PDF & Protect PDF.
    -   *MCP Usage*: `designpattern` (Security Best Practices), `context7` for `pdf-lib` security features.
-   **Task 3.4:** Implement Compress PDF. Research and integrate techniques for client-side compression.
    -   *MCP Usage*: `scientificmethod` for testing compression quality vs. size, `decisionframework` for choosing methods.
-   **Task 3.5 (Medium Priority):** Implement Sign PDF (draw/type).
    -   *MCP Usage*: `visualreasoning` for signature capture UI.
-   **Task 3.6 (Investigate/Low Priority):** Investigate and implement high-priority simple conversions (e.g., TXT to PDF, PDF to TXT). Defer complex Office conversions.
    -   *MCP Usage*: `decisionframework` for prioritization, `mentalmodel` for conversion logic.

### Phase 4: AI Features & Enhancements (4-5 Weeks)
-   **Task 4.1:** Integrate Google Generative AI SDK. Implement Gemini API key handling and model selection logic in Settings.
    -   *MCP Usage*: `context7` for SDK, `designpattern` (API Integration).
-   **Task 4.2:** Implement PDF text extraction and chunking strategy for RAG.
    -   *MCP Usage*: `mentalmodel` for RAG pipeline, `programmingparadigm` (Functional) for text processing.
-   **Task 4.3:** Implement "Chat with PDF" feature.
    -   *MCP Usage*: `agenticdesignpattern` for conversational UI, `sequentialthinking` for flow.
-   **Task 4.4:** Implement "AI PDF Summarizer" feature.
    -   *MCP Usage*: `agenticdesignpattern`.
-   **Task 4.5 (Medium Priority):** Research and implement client-side OCR (e.g., Tesseract.js for React Native).
    -   *MCP Usage*: `decisionframework` for library choice, `scientificmethod` for accuracy testing.
-   **Task 4.6 (Medium Priority):** Integrate OCR with AI features for scanned documents.
    -   *MCP Usage*: `designpattern` for conditional logic (if PDF is image-based).
-   **Task 4.7 (Medium Priority):** Implement Scan to PDF (camera integration, image processing).
    -   *MCP Usage*: `context7` for camera/image libraries.
-   **Task 4.8 (Medium Priority):** Implement Translate PDF (AI).
    -   *MCP Usage*: `agenticdesignpattern`.
-   **Task 4.9 (Low Priority):** Implement other low-priority tools (Crop, Basic Text/Image Add, Redact, Repair, Compare, AI Question Gen) if time permits or defer.
    -   *MCP Usage*: `decisionframework` for selection.

### Phase 5: Testing, Refinement & Documentation (2-3 Weeks)
-   **Task 5.1:** Comprehensive testing across features, focusing on different PDF types and sizes.
    -   *MCP Usage*: `debuggingapproach`, `scientificmethod` for structured testing.
-   **Task 5.2:** Performance profiling and optimization, especially for large files and complex operations.
    -   *MCP Usage*: `mentalmodel` (Error Propagation for performance issues).
-   **Task 5.3:** Accessibility audit and improvements (WCAG 2.1 AA).
    -   *MCP Usage*: `collaborativereasoning` (simulating user with accessibility needs).
-   **Task 5.4:** UI/UX refinement based on testing and feedback.
    -   *MCP Usage*: `visualreasoning`.
-   **Task 5.5:** Finalize all in-app text, help messages, and error messages.
-   **Task 5.6:** Prepare README.md, CHANGELOG.md, and other documentation.
    -   *MCP Usage*: `getCurrentDateTime_node` for timestamps.
-   **Task 5.7:** Prepare for deployment (EAS Build setup, store listing assets).

### Phase 6: Deployment & Initial Release (1 Week)
-   **Task 6.1:** Build release candidates using EAS Build.
-   **Task 6.2:** Submit to Apple App Store and Google Play Store.
-   **Task 6.3:** Monitor initial release for critical bugs.
-   **Task 6.4 (Optional):** Deploy web version via Expo for Web (with acknowledged limitations).

## API Endpoints (if applicable)
Not applicable for custom backend. Interactions with Gemini API will be client-side.
**Gemini API (Example - for generative models):**
-   `POST https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent`
    -   Used for Chat with PDF, Summarizer, Translate, Question Generator.
    -   Payload includes text prompts, context (chunked PDF text for RAG).
-   `GET https://generativelanguage.googleapis.com/v1beta/models`
    -   Used to list available models for user selection.

## Data Models (if applicable)
No backend database models. Client-side state models:
### SettingsState (Zustand Store)
-   `geminiApiKey`: `string | null` - User's Gemini API Key.
-   `selectedGeminiModel`: `string` - Name of the selected Gemini model.
-   `userConsentForAI`: `boolean` - User consent for sending data to Gemini (if needed for compliance).

### PDFToolState (Local component state or temporary context)
-   `currentFile`: `object | null` - Representation of the loaded PDF file (path, URI, metadata).
-   `processedFile`: `object | null` - Representation of the processed PDF file.
-   `isLoading`: `boolean` - Indicates if an operation is in progress.
-   `progress`: `number` - Percentage of progress for long operations.
-   `error`: `string | null` - Error message if an operation fails.

## AI Implementation Requirements

### Gemini API Integration
-   Implement using the official `@google/generative-ai` SDK for JavaScript.
-   User must provide their own Gemini API key via a dedicated settings page.
-   The API key will be stored securely on the device using `Expo.SecureStore`.
-   The application will include functionality for users to select their preferred Gemini model from a list fetched via the API.
-   All API calls to Gemini will be made directly from the client-side.

### Retrieval Augmented Generation (RAG) for "Chat with PDF"
-   **Text Extraction:** Extract text content from the selected PDF. If the PDF is image-based, attempt client-side OCR.
-   **Chunking:** Divide the extracted text into manageable chunks (e.g., by paragraph, section, or fixed token count) to fit within the Gemini API's context window limits.
-   **Prompt Engineering:** Construct prompts for the Gemini API that include the user's query and relevant text chunks as context.
-   **Error Handling & Limits:** Gracefully handle API rate limits, token limitations, and potential errors from the Gemini API. Provide informative messages to the user.

### Gemini Model Listing (User-Provided Code Snippet)
The following demonstrates how to list available Gemini models. This logic will be adapted for the settings screen to populate the model selection UI.

#### 📦 1. Install Google Generative AI SDK (for Node.js)
This will be a project dependency.
```bash
npm install @google/generative-ai
```

---
#### 🔑 2. Setup API Key
The API key will be retrieved from `Expo.SecureStore` after the user provides it.
```javascript
// In geminiService.ts or similar
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as SecureStore from 'expo-secure-store';

// Function to get client, API_KEY will be dynamic
async function getGenAIClient() {
  const apiKey = await SecureStore.getItemAsync('geminiApiKey');
  if (!apiKey) {
    throw new Error("Gemini API Key not found. Please set it in settings.");
  }
  return new GoogleGenerativeAI(apiKey);
}
```

---
#### 📋 3. List Available Models
This function will be used in the settings screen to fetch and display models.
```javascript
// In geminiService.ts or similar
export async function listAvailableModels() {
  try {
    const genAI = await getGenAIClient(); // Uses the dynamically fetched API key
    const result = await genAI.listModels(); // Updated SDK usage if client instance already has listModels

    // The actual listModels() in the SDK returns an iterator or an array directly.
    // Let's assume it returns an array of model objects.
    // The SDK might have changed, refer to official docs for exact method signature.
    // Example structure based on user prompt:
    let modelsInfo = [];
    for await (const m of result) { // if it's an iterator
        modelsInfo.push({
            name: m.name,
            // description: m.description, // May not be directly available this way, check SDK
            // inputTokenLimit: m.inputTokenLimit, // Check SDK
            // outputTokenLimit: m.outputTokenLimit, // Check SDK
        });
    }
    // If result is directly an array:
    // modelsInfo = result.map(model => ({ name: model.name, ... }));


    // For the sake of this example, assuming a structure like:
    // const models = await genAI.getGenerativeModel({ model: "" }).listModels(); // Or similar call
    // This part needs to be verified with the actual @google/generative-ai SDK usage for listing models
    // The user provided snippet was:
    // const models = await client.listModels();
    // models.forEach((model) => { ... });
    // This implies client.listModels() returns an array directly.
    // Let's refine to match what the user provided more closely for the listModels function.

    const models = await genAI.listModels(); // Assuming this returns the array as in user's example
    return models.map(model => ({
        name: model.name,
        description: model.description || 'N/A', // Provide fallback
        inputTokenLimit: model.inputTokenLimit || 'N/A',
        outputTokenLimit: model.outputTokenLimit || 'N/A',
    }));

  } catch (error) {
    console.error("Error listing Gemini models:", error);
    throw error; // Re-throw to be handled by UI
  }
}

// Example usage in a component:
// listAvailableModels().then(models => {
//   console.log(models);
// }).catch(error => {
//   console.error(error.message);
// });
```
*(Note: The exact structure and availability of `description`, `inputTokenLimit`, `outputTokenLimit` directly from `client.listModels()` response items should be verified against the latest Google Generative AI SDK documentation. The core idea is to fetch and map model names.)*

---
#### ✅ Output Example (from listing models)
The UI will present these models, like:
```
Model name: models/gemini-1.5-pro
Model name: models/gemini-1.0-pro
Model name: models/gemini-1.5-flash
...
```

---
#### 🧠 Notes (from user)
*   User must have billing enabled and API access for their Gemini key.
*   Model listing is accessible via `@google/generative-ai` client or direct REST calls to: `GET https://generativelanguage.googleapis.com/v1beta/models`

## Environment Variables
```
# Required environment variables (primarily for build or local config, not direct app use if API key is user-input)
# No hardcoded API keys here. .env is for local convenience if any such config is needed during dev.

# .env.example (template for .env, which is gitignored)
# Example: If we had a default non-sensitive API key for a very limited-use internal feature (NOT for Gemini user key)
# DEFAULT_FALLBACK_API_KEY_IF_ANY="your_default_key_here"
# For this project, as Gemini API key is user-input, .env might be minimal or not used for API keys.

# It's good practice to have an .env.example even if it's mostly comments explaining
# what *could* go into a .env file if the project evolved.
# For now, it can be very simple:
# --- .env.example ---
# This project primarily uses user-provided API keys stored via SecureStore.
# Environment variables defined here are for Expo's build process or local development overrides if needed.
# EXPO_PUBLIC_APP_NAME="All PDF Tools"
# EXPO_PUBLIC_SOME_CONFIG_VAR="value"
```

## Testing Strategy
-   **Unit Tests:** Jest for testing utility functions, PDF processing logic (mocking `pdf-lib` interactions where complex), state management, and service integrations (e.g., Gemini service mocks).
-   **Component Tests:** React Native Testing Library for testing individual UI components in isolation.
-   **Integration Tests:** Testing interactions between components, navigation, and state management.
-   **End-to-End (E2E) Tests:** Consider Detox or Maestro for critical user flows (e.g., pick PDF -> merge -> save; pick PDF -> chat with AI). This might be a later phase due to setup complexity.
-   **Manual Testing:** Thorough manual testing on physical iOS and Android devices covering all features, various PDF files (small, large, complex, scanned), and edge cases.
-   **Performance Testing:** Manually test with large files (up to 100MB) to identify bottlenecks. Use Expo's performance monitoring tools.
-   **Accessibility Testing:** Use tools like accessibility inspectors and manual testing with screen readers.

## Deployment Strategy
-   **Builds:** Expo Application Services (EAS) Build for creating development and production builds for iOS and Android.
-   **Distribution:**
    -   **iOS:** Submit to Apple App Store via EAS Submit or manually through App Store Connect.
    -   **Android:** Submit to Google Play Store via EAS Submit or manually through Google Play Console.
-   **Updates:** EAS Update for deploying JavaScript bundle updates directly to users without needing a full app store release (for bug fixes and minor JS-only changes).
-   **Web (Optional):** Deploy the web version using `expo export -p web` and host on a static hosting provider (e.g., Vercel, Netlify, GitHub Pages). Feature set may be limited.
-   **Versioning:** Semantic Versioning (MAJOR.MINOR.PATCH). Maintain a `CHANGELOG.md`.

## Maintenance Plan
-   **Monitoring:** Monitor app store reviews and user feedback for bug reports and feature requests.
-   **Bug Fixes:** Prioritize and address critical bugs promptly. Use EAS Update for rapid hotfixes.
-   **Dependency Updates:** Regularly update dependencies (Expo SDK, React Native, PDF libraries, Gemini SDK) to ensure security and compatibility. Test thoroughly after updates.
-   **OS Compatibility:** Test against new major iOS and Android versions.
-   **Feature Enhancements:** Periodically review backlog for future enhancements based on user feedback and project goals.

## Risks and Mitigations
| Risk                                            | Impact | Likelihood | Mitigation                                                                                                                               |
|-------------------------------------------------|--------|------------|------------------------------------------------------------------------------------------------------------------------------------------|
| Client-side PDF library limitations/bugs        | High   | Medium     | Thoroughly evaluate libraries (`pdf-lib`, etc.). Implement robust error handling. Have fallback strategies or simplify features if needed.     |
| Performance issues with large PDFs (100MB)      | High   | Medium     | Optimize processing logic. Use progress indicators. Warn users. Explore chunked processing if feasible. Benchmark on target devices.         |
| Complexity of client-side file conversions      | High   | High       | Prioritize common/simpler conversions (image/text). Defer/scope down complex Office conversions. Clearly communicate limitations.        |
| Gemini API changes or rate limits               | Medium | Medium     | Stay updated with API documentation. Implement robust error handling and retry mechanisms. Inform users about potential API key issues.    |
| OCR client-side feasibility/performance         | Medium | Medium     | Research lightweight, effective OCR libraries. Test performance extensively. Offer OCR as an optional step.                                |
| Managing large number of diverse features       | Medium | Medium     | Phased development. Strong modular design. Prioritize core features. Use `metacognitivemonitoring` to track complexity.                       |
| User adoption of self-provided API key for AI   | Medium | Low-Medium | Clearly explain the benefits (privacy, control) and provide easy instructions. Ensure AI features provide significant value.             |
| Cross-platform inconsistencies (iOS/Android/Web)| Medium | Medium     | Test thoroughly on all target platforms. Use Expo to abstract many platform differences. Limit web scope if necessary.                 |
| Keeping up with Expo/RN/library updates         | Low    | High       | Schedule regular maintenance windows for updates. Test thoroughly.                                                                       |

## Future Enhancements
-   Advanced PDF editing features (e.g., annotation tools like highlighting, drawing).
-   Support for more complex file format conversions (if client-side solutions become more viable).
-   Batch processing for multiple files for certain operations.
-   Cloud integration (optional, user-driven) for backup or cross-device sync (would require authentication and backend, changing project scope).
-   Customizable UI themes.
-   Localization for multiple languages.
-   Enhanced AI features (e.g., document comparison using AI, style/tone adjustment for text).
-   Template-based PDF generation.

## Development Guidelines
### Code Quality & Design Principles
-   Follow industry-standard coding best practices (clean code, modularity, error handling, security, scalability).
-   Apply SOLID, DRY (via abstraction), and KISS principles.
-   Design modular, reusable components/functions using TypeScript.
-   Optimize for code readability and maintainable structure.
-   Add concise, useful function-level JSDoc/TSDoc comments.
-   Implement comprehensive error handling (try-catch, custom error types, async/await error propagation).

### Frontend Development (React Native Expo)
-   Provide modern, clean, professional, and intuitive UI designs.
-   Adhere to UI/UX principles (clarity, consistency, simplicity, feedback, accessibility/WCAG 2.1 AA).
-   Use selected styling solution (e.g., NativeWind, Tamagui) consistently.
-   Use Expo Router for navigation.
-   Use TanStack Query for server state/async operations and Zustand for global client state.
-   Prefer `moti` for simple animations, `react-native-reanimated` for complex ones if needed.

### Data Handling & APIs
-   Integrate with Gemini API as specified.
-   Prohibit placeholder, mock, or dummy API responses in the final code for Gemini interactions.
-   Gemini API key accepted exclusively via user input in settings and stored in `Expo.SecureStore`.
-   Centralize all Gemini API endpoint URLs/configurations in `services/geminiService.ts` or a dedicated config file.
-   Never hardcode API keys directly in service/component files.

### Asset Generation
-   Do not use placeholder images or icons.
-   If custom graphics are needed, create them as SVG and convert to PNG (e.g., using a build script with `sharp` if automation is desired, or manually for app assets).
-   Reference only the generated PNG files (or SVGs directly if using `react-native-svg`) within the application code.

### Documentation Requirements
-   Create a comprehensive `README.md` including project overview, setup instructions (for contributors), feature list, and how to use AI features (API key setup). Add last updated date and time using `getCurrentDateTime_node` tool.
-   Maintain a `CHANGELOG.md` to document changes using semantic versioning.
-   Document required API keys/credentials (i.e., user needs their own Gemini key) clearly in the README and app's help/settings section.
-   Ensure all documentation is well-written, accurate, and reflects the final code.

## Tool Usage Instructions (For AI Code Assistant)

### MCP Servers and Tools
-   Use the `context7` MCP server to gather contextual information about the current task, including relevant libraries (React Native, Expo, `pdf-lib`, `@google/generative-ai`), frameworks, and APIs.
-   Use the clear thought MCP servers for various problem-solving approaches:
    -   `mentalmodel_clear_thought`: For applying structured problem-solving approaches (First Principles Thinking for core PDF logic, Opportunity Cost Analysis for feature trade-offs, Error Propagation Understanding for debugging complex PDF operations, Rubber Duck Debugging, Pareto Principle for prioritization, Occam's Razor for simplest solutions).
    -   `designpattern_clear_thought`: For applying software architecture and implementation patterns (Modular Architecture for tool separation, API Integration Patterns for Gemini, State Management with Zustand/TanStack Query, Asynchronous Processing for PDF tasks, Scalability Considerations for handling large files, Security Best Practices for API key storage, Agentic Design Patterns for AI interactions).
    -   `programmingparadigm_clear_thought`: For applying different programming approaches (Primarily Functional Programming for data transformations and utils, Event-Driven Programming for UI, Object-Oriented Programming for encapsulating complex tool logic if beneficial, Reactive Programming for state updates).
    -   `debuggingapproach_clear_thought`: For systematic debugging of technical issues (Binary Search in code, Reverse Engineering PDF library issues, Divide and Conquer for complex bugs, Backtracking, Cause Elimination, Program Slicing).
    -   `collaborativereasoning_clear_thought`: For simulating expert collaboration (e.g., UX designer for tool usability, mobile performance expert for large file handling, AI ethics expert for RAG implications) to refine features and solutions.
    -   `decisionframework_clear_thought`: For structured decision analysis (e.g., choosing PDF libraries, OCR tools, RAG chunking strategies based on criteria like performance, accuracy, complexity, licensing).
    -   `metacognitivemonitoring_clear_thought`: For tracking knowledge boundaries and reasoning quality (e.g., assessing confidence in a chosen client-side conversion approach, identifying potential biases in UI design favoring one platform).
    -   `scientificmethod_clear_thought`: For applying formal scientific reasoning (e.g., hypothesis testing for performance bottlenecks: "Hypothesis: Current PDF parsing is slow due to X. Experiment: Profile A vs. B parsing method.").
    -   `structuredargumentation_clear_thought`: For dialectical reasoning and argument analysis (e.g., Thesis: "Client-side DOCX conversion is feasible." Antithesis: "It's too resource-intensive." Synthesis: "Prioritize core formats, explore limited DOCX support with clear warnings.").
    -   `visualreasoning_clear_thought`: For visual thinking in UI/UX design (tool dashboard, page organization), RAG data flow, and component hierarchy.
    -   `sequentialthinking_clear_thought`: For breaking down complex problems and implementation tasks into manageable, ordered steps, ensuring all sub-tasks are covered.
-   Use the date and time MCP server:
    -   Use `getCurrentDateTime_node` tool to get the current date and time in UTC format.
    -   Add "Last updated: [YYYY-MM-DDTHH:mm:ssZ]" to the `README.md` file.
-   Use the `websearch` tool to find information on the internet when needed (e.g., latest PDF library APIs, Gemini SDK updates, solutions to specific React Native issues).

### System & Environment Considerations
-   Target system for development assistance: Windows 11 Home Single Language 23H2.
-   Use semicolon (`;`) as the command separator in PowerShell commands, not `&&`.
-   Use `New-Item -ItemType Directory -Path "path1", "path2", ... -Force` for creating directories in PowerShell.
-   Use language-native path manipulation libraries (e.g., Node.js `path` module, or Expo's `expo-file-system` for app-specific paths) for robust path handling.
-   Use package manager commands (npm or yarn, as per project setup, likely npm for Expo) via the `launch-process` tool to add dependencies; do not edit `package.json` directly for adding/removing dependencies.

### Error Handling & Debugging
-   First attempt to resolve errors autonomously using available tools and MCP servers.
-   Perform systematic debugging: consult web resources, official documentation, modify code based on hypotheses, adjust configuration, and retry.
-   Report back only if an insurmountable blocker persists after exhausting all self-correction efforts.

## Conclusion
The "All PDF Tools" React Native Expo app aims to be a powerful, private, and free utility for mobile users. By focusing on on-device processing for core PDF tasks and leveraging the Gemini API for advanced AI features (with user-provided keys), it offers a unique value proposition. The successful execution of this plan will require careful attention to client-side performance, library selection, and user experience, particularly for the extensive feature set. The phased approach and use of MCP servers will guide a structured and robust development process.
```