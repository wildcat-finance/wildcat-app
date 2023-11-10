import type { CodegenConfig } from '@graphql-codegen/cli';
import dotenv from 'dotenv';

dotenv.config();

const { REACT_APP_APOLLO_SERVER_URL } = process.env;

const config: CodegenConfig = {
    schema: REACT_APP_APOLLO_SERVER_URL,
    generates: {
        'introspection.json': {
            plugins: ['introspection'],
            config: {
                minify: true,
            },
        },

        './src/generated/types.ts': {
            documents: './src/**/*.gql',
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-apollo',
            ],
            config: {
                useIndexSignature: true,
                ignoreNoDocuments: true,
                withHooks: true,
                maybeValue: 'T',
            },
        },
    },
};
export default config;
