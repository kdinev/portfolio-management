# Architecture Documentation

## System Architecture

### Application Type
**Single Page Application (SPA)** built with Angular 18 using standalone components architecture.

## Technology Stack

### Frontend Framework
- **Angular 18** - Latest version with standalone components
- **TypeScript 5.4** - Type-safe development
- **RxJS 7.8** - Reactive programming with Observables

### UI Framework
- **Angular Material 18** - Material Design components
- **SCSS** - Enhanced CSS with nesting and variables

### Build & Development
- **Angular CLI** - Project scaffolding and build tooling
- **Webpack** (via Angular CLI) - Module bundling
- **TypeScript Compiler** - Code compilation

## Application Architecture

### Component Architecture

```
App Component (Root)
├── Header Component (Navigation)
└── Router Outlet
    ├── Dashboard Component (Lazy)
    ├── Portfolio Component (Lazy)
    ├── Analytics Component (Lazy)
    └── Alerts Component (Lazy)
```

### Service Layer

#### PortfolioService
- **Responsibility**: Portfolio data management
- **Pattern**: Singleton service (providedIn: 'root')
- **State Management**: BehaviorSubject for reactive state
- **Features**:
  - Real-time price simulation
  - CRUD operations for assets
  - Portfolio metrics calculation
  - Price update interval (3 seconds)

#### AlertService
- **Responsibility**: Market alerts and notifications
- **Pattern**: Singleton service
- **State Management**: BehaviorSubject for alert list
- **Features**:
  - Alert generation and management
  - Severity classification
  - Read/unread state tracking
  - Auto-alert generation (30 seconds)

#### AnalyticsService
- **Responsibility**: Performance analytics
- **Pattern**: Stateless service
- **Features**:
  - Category performance aggregation
  - Top/bottom performer calculation
  - Portfolio allocation analysis

### Data Flow

```
User Action
    ↓
Component (View Layer)
    ↓
Service (Business Logic)
    ↓
BehaviorSubject (State)
    ↓
Observable Stream
    ↓
Component (Auto Update via Async Pipe)
    ↓
UI Renders
```

## Data Models

### Core Entities

#### Asset
```typescript
{
  id: string
  symbol: string
  name: string
  category: AssetCategory
  quantity: number
  purchasePrice: number
  currentPrice: number
  purchaseDate: Date
  lastUpdated: Date
}
```

#### Portfolio
```typescript
{
  id: string
  name: string
  description: string
  assets: Asset[]
  totalValue: number
  totalCost: number
  profitLoss: number
  profitLossPercentage: number
  createdDate: Date
  lastUpdated: Date
}
```

#### MarketAlert
```typescript
{
  id: string
  type: AlertType
  severity: AlertSeverity
  title: string
  message: string
  assetSymbol?: string
  timestamp: Date
  isRead: boolean
}
```

#### CategoryPerformance
```typescript
{
  category: AssetCategory
  totalValue: number
  totalCost: number
  profitLoss: number
  profitLossPercentage: number
  assetCount: number
  allocation: number
}
```

## Routing Strategy

### Lazy Loading
All feature modules are lazy-loaded to optimize initial bundle size:
- Dashboard: Loaded on-demand at `/`
- Portfolio: Loaded on-demand at `/portfolio`
- Analytics: Loaded on-demand at `/analytics`
- Alerts: Loaded on-demand at `/alerts`

### Route Configuration
```typescript
{
  path: '',
  loadComponent: () => import('./pages/dashboard/...')
}
```

## State Management

### Pattern: Observable Data Services

#### Why This Pattern?
- Simple for small to medium applications
- No external dependencies
- Built-in with RxJS
- Easy to test and debug

#### Implementation
```typescript
private dataSubject = new BehaviorSubject<T>(initialValue);
public data$ = this.dataSubject.asObservable();
```

#### Benefits
- Single source of truth
- Automatic change detection
- Memory efficient
- Type-safe

## Real-Time Updates

### Price Update Mechanism
```typescript
interval(3000).subscribe(() => {
  this.updatePrices();
});
```

### Alert Generation
```typescript
interval(30000).subscribe(() => {
  this.generateRandomAlert();
});
```

### Change Detection Strategy
- **Default Change Detection** for all components
- **Async Pipe** for automatic subscription management
- **OnPush** strategy ready for optimization

## Performance Optimizations

### Implemented
1. **Lazy Loading** - Routes loaded on-demand
2. **Async Pipe** - Automatic subscription cleanup
3. **Tree Shaking** - Unused code elimination
4. **AOT Compilation** - Ahead-of-time compilation
5. **Material Design** - Optimized component library

### Potential Optimizations
1. OnPush change detection strategy
2. Virtual scrolling for large lists
3. Service worker for offline support
4. Code splitting for third-party libraries
5. Image lazy loading

## Security Considerations

### Current Implementation
- **Type Safety**: TypeScript prevents type-related vulnerabilities
- **Dependency Management**: Regular security audits with npm audit
- **XSS Protection**: Angular's built-in sanitization

### Production Requirements
- [ ] Add authentication (OAuth 2.0 / JWT)
- [ ] Implement authorization (role-based access)
- [ ] Enable HTTPS
- [ ] Add CSRF protection
- [ ] Implement rate limiting
- [ ] Add input validation
- [ ] Secure API communication

## Scalability

### Current Capacity
- **Assets**: Handles 100+ assets efficiently
- **Alerts**: Maintains 50 recent alerts
- **Updates**: Real-time updates every 3 seconds
- **Categories**: Supports 7 asset categories

### Scaling Strategy
1. **Horizontal Scaling**
   - Deploy multiple instances behind load balancer
   - Use CDN for static assets
   - Implement caching strategies

2. **Vertical Scaling**
   - Optimize bundle size
   - Implement virtual scrolling
   - Use web workers for heavy calculations

3. **Data Scaling**
   - Pagination for large datasets
   - Backend API integration
   - Database optimization

## Testing Strategy

### Unit Testing
- **Framework**: Jasmine + Karma
- **Coverage**: Services and components
- **Mocking**: RxJS testing utilities

### E2E Testing (Recommended)
- **Framework**: Cypress or Playwright
- **Scenarios**: User workflows
- **Coverage**: Critical paths

### Test Commands
```bash
npm test           # Run unit tests
npm test -- --watch # Watch mode
npm test -- --code-coverage # With coverage
```

## Build & Deployment

### Development Build
```bash
npm start
# Output: JIT compilation, source maps, hot reload
```

### Production Build
```bash
npm run build
# Output: AOT compilation, minification, tree-shaking
# Location: dist/portfolio-manager/
```

### Build Optimization
- **Minification**: Enabled in production
- **Source Maps**: Disabled in production
- **Hashing**: File names hashed for cache busting
- **Compression**: Gzip/Brotli recommended

## Monitoring & Logging

### Recommended Tools
1. **Error Tracking**: Sentry or Rollbar
2. **Analytics**: Google Analytics or Mixpanel
3. **Performance**: Lighthouse or WebPageTest
4. **User Monitoring**: FullStory or LogRocket

### Logging Strategy
```typescript
// Development
console.log('Debug info');

// Production
errorTrackingService.logError(error);
analyticsService.trackEvent(event);
```

## API Integration (Future)

### Recommended Architecture
```typescript
@Injectable()
export class MarketDataService {
  constructor(private http: HttpClient) {}
  
  getRealTimePrices(): Observable<Price[]> {
    return this.http.get<Price[]>(API_URL);
  }
}
```

### WebSocket Integration
```typescript
const socket = new WebSocket(WS_URL);
socket.onmessage = (event) => {
  this.priceSubject.next(JSON.parse(event.data));
};
```

## Environment Configuration

### Current Setup
- `environment.ts` - Development config
- `environment.prod.ts` - Production config

### Recommended Variables
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  wsUrl: 'ws://localhost:3000',
  updateInterval: 3000,
  alertInterval: 30000
};
```

## Browser Support

### Supported Browsers
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

### Polyfills
Included in `polyfills.ts`:
- Zone.js for change detection
- ES2022 features

## Accessibility

### WCAG Compliance
- Material Design components are ARIA-compliant
- Semantic HTML structure
- Keyboard navigation support
- Screen reader compatible

### Improvements Needed
- [ ] Add ARIA labels to custom components
- [ ] Implement focus management
- [ ] Add keyboard shortcuts
- [ ] Test with screen readers

## Documentation

### Available Documentation
1. `README.md` - Project overview and setup
2. `QUICKSTART.md` - Quick start guide
3. `ARCHITECTURE.md` - This file
4. `.github/copilot-instructions.md` - Project context

### Code Documentation
- TypeScript interfaces document data structures
- Service methods include JSDoc comments (recommended)
- Component templates are self-documenting

---

**Last Updated**: Project Creation
**Version**: 1.0.0
**Maintainer**: Development Team
