import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Swagger configuration options
const options: swaggerJsDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'URL Shortener API',
      version: '1.0.0',
      description: 'A simple URL shortener API built with Express and TypeScript',
    },
  },

  apis: ['./src/routes/*.ts', './src/controllers/*.ts', './src/services/*.ts'], 
};

const swaggerSpec = swaggerJsDoc(options);

export { swaggerSpec, swaggerUi };
