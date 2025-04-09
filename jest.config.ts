import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/test/jest.setup.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: 'tsconfig.json',
            isolatedModules: true,
        }],
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/test/__mocks__/fileMock.js'
    },
    testMatch: [
        "**/__tests__/**/*.[jt]sx",  // Changed to only match tsx files in __tests__ directories
        "**/*.test.[jt]sx",          // Changed to only match tsx test files
        "**/*.spec.[jt]sx"           // Changed to only match tsx spec files
    ],
    transformIgnorePatterns: [
        "/node_modules/(?!(@radix-ui|@babel/runtime)/)"
    ]
};

export default config;

