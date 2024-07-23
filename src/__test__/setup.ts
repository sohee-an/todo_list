import '@testing-library/jest-dom';
import { vi } from 'vitest';



afterEach(() => {
    // 히스토리 초기화
    vi.clearAllMocks()
})

afterAll(() => {
  vi.resetAllMocks();
});
