module.exports = {
    preset: 'ts-jest',
    testMatch: ['<rootDir>/src/**/*.test.(ts|tsx|js)'],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
};
