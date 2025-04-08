"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: [
        '<rootDir>/src/test/jest.setup.ts'
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.ts',
        '\\.(gif|ttf|eot|svg|png|jpg|jpeg)$': '<rootDir>/__mocks__/fileMock.ts',
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json', isolatedModules: true }],
        '^.+\\.(js|jsx)$': 'babel-jest'
    },
    transformIgnorePatterns: [
        '/node_modules/(?!(@radix-ui|@testing-library|styled-components)/)'
    ],
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '/__tests__/',
        '/dist/'
    ],
    testEnvironmentOptions: {
        url: 'http://localhost'
    },
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json',
            isolatedModules: true
        }
    }
};
exports.default = config;
//# sourceMappingURL=jest.config.js.map