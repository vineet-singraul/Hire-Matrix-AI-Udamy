# Dashboard API

## Endpoint

| | |
|---|---|
| **Method** | `GET` |
| **Path** | `/dashboard/fetchDetails` |
| **Base URL** | `https://hire-matrix-ai-backend.onrender.com` |
| **Auth** | `Authorization: Bearer <token>` (token read from `localStorage`, attached automatically by the axios interceptor) |
| **Used in** | [src/app/page.tsx:45](src/app/page.tsx#L45) |

## Request

No query params, no request body.

```
GET /dashboard/fetchDetails
Authorization: Bearer <token>
```

## Response

```ts
interface DashboardFetchDetailsResponse {
  status: boolean;
  data: {
    cards: {
      totalJobs: number;
      totalCandidates: number;
      totalAiMatches: number;
      responseRate: number;
    };
    candidateGrowth: {
      month: string;
      total: number;
    }[];
  };
}
```

### Example

```json
{
  "status": true,
  "data": {
    "cards": {
      "totalJobs": 24,
      "totalCandidates": 318,
      "totalAiMatches": 142,
      "responseRate": 67
    },
    "candidateGrowth": [
      { "month": "Jan", "total": 12 },
      { "month": "Feb", "total": 20 },
      { "month": "Mar", "total": 35 }
    ]
  }
}
```

### Field notes

- `cards.totalJobs` — total job postings
- `cards.totalCandidates` — total candidates in system
- `cards.totalAiMatches` — total AI-matched candidates
- `cards.responseRate` — response rate, percentage (0–100)
- `candidateGrowth[].month` — short month label (e.g. `"Jan"`)
- `candidateGrowth[].total` — candidate count for that month

## Auth failure behavior

On `401`, the axios interceptor ([src/services/axios.ts:104-118](src/services/axios.ts#L104-L118)) clears `token`/`id`/`fullName`/`email`/`phone` from `localStorage`, sets `sessionExpired` in `sessionStorage`, and redirects to `/auth/signin`.

## Notes

- This is the only live Dashboard API call. `RecentActivityCard` and `TopMatchCard` currently render static/hardcoded data, not API data.
