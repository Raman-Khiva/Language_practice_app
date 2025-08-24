/**
 * Main exports file for the Product Context module
 * Provides clean imports for all context-related functionality
 */

// Export main context and provider
export { ProductContext, default as ProductProvider } from './ProductContext';

// Export service modules for direct use if needed
export * from './authService';
export * from './dataService'; 
export * from './progressService';
export * from './constants';