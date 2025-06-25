import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach, expect } from 'vitest';
// SEE: https://github.com/chaance/vitest-axe?tab=readme-ov-file#extend-in-test-setup-file
// biome-ignore lint/performance/noNamespaceImport: this is recommended for vitest-axe
import * as matchers from 'vitest-axe/matchers';

expect.extend(matchers);

afterEach(() => cleanup());
