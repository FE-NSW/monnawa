1. 초대받기 기능 - 초대 수락 api
```
curl -X POST http://localhost:3000/api/room/join \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6IlVaaXhiZ3pMQnNRTFpKcXciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3VxcWVxanZqaGNvdHJ0ZGZ0anZrLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJlNzRhMDUxMi1kZGIxLTQxN2MtOTAyOS0zNDUzYzhlMzI2YjUiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzM2Mzk5NjYzLCJpYXQiOjE3MzYzOTYwNjMsImVtYWlsIjoiZGV2bG9hZEBrYWthby5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6Imtha2FvIiwicHJvdmlkZXJzIjpbImtha2FvIl19LCJ1c2VyX21ldGFkYXRhIjp7ImF2YXRhcl91cmwiOiJodHRwOi8vay5rYWthb2Nkbi5uZXQvZG4vYktndURjL2J0c0VZWm5oZ1k3L3U4Rk5tSndXVGtnRGRXWFJmNUlWWTEvaW1nXzY0MHg2NDAuanBnIiwiZW1haWwiOiJkZXZsb2FkQGtha2FvLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmdWxsX25hbWUiOiLrhbjshLHtmIQiLCJpc3MiOiJodHRwczovL2thcGkua2FrYW8uY29tIiwibmFtZSI6IuuFuOyEse2YhCIsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoi64W47ISx7ZiEIiwicHJvdmlkZXJfaWQiOiIzODY2OTE4NzMxIiwic3ViIjoiMzg2NjkxODczMSIsInVzZXJfbmFtZSI6IuuFuOyEse2YhCJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6Im9hdXRoIiwidGltZXN0YW1wIjoxNzM2Mzk2MDYzfV0sInNlc3Npb25faWQiOiI1YjUwNTVhYi0zMzcwLTRmM2EtODhlYy00OGIxYTJkYWUwMTYiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.vAHdGjPFALwkc2LVjxWWbrrsCp1ZKHXue05-1F9xPX8" \
  -H "Content-Type: application/json" \
  -d '{"id": "53"}'

```
2. 초대받기 기능 - 초대장 정보 받아오는 api
```
curl -X POST http://localhost:3000/api/invites \
  -H "Content-Type: application/json" \
  -d '{"id": 1}'
```

```
curl -X POST http://localhost:3000/api/room/find \
  -H "Content-Type: application/json" \
  -d '{"id": 53}' -v
```
3. 리뷰쓰기 기능 - 리뷰쓰는 사람 정보api
->유저 정보하는 API
```
curl -X POST http://localhost:3000/api/user \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "id": "e74a0512-ddb1-417c-9029-3453c8e326b5"
  }'
```
4. 리뷰쓰기 기능 - 리뷰가게 정보 api (에피소드와함께)
```
curl -X POST http://localhost:3000/api/review/write \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6IlVaaXhiZ3pMQnNRTFpKcXciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3VxcWVxanZqaGNvdHJ0ZGZ0anZrLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJlNzRhMDUxMi1kZGIxLTQxN2MtOTAyOS0zNDUzYzhlMzI2YjUiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzM2Mzk5NjYzLCJpYXQiOjE3MzYzOTYwNjMsImVtYWlsIjoiZGV2bG9hZEBrYWthby5jb20iLCJwaG9uZSI6IiIsImFwcF9tZXRhZGF0YSI6eyJwcm92aWRlciI6Imtha2FvIiwicHJvdmlkZXJzIjpbImtha2FvIl19LCJ1c2VyX21ldGFkYXRhIjp7ImF2YXRhcl91cmwiOiJodHRwOi8vay5rYWthb2Nkbi5uZXQvZG4vYktndURjL2J0c0VZWm5oZ1k3L3U4Rk5tSndXVGtnRGRXWFJmNUlWWTEvaW1nXzY0MHg2NDAuanBnIiwiZW1haWwiOiJkZXZsb2FkQGtha2FvLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmdWxsX25hbWUiOiLrhbjshLHtmIQiLCJpc3MiOiJodHRwczovL2thcGkua2FrYW8uY29tIiwibmFtZSI6IuuFuOyEse2YhCIsInBob25lX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoi64W47ISx7ZiEIiwicHJvdmlkZXJfaWQiOiIzODY2OTE4NzMxIiwic3ViIjoiMzg2NjkxODczMSIsInVzZXJfbmFtZSI6IuuFuOyEse2YhCJ9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6Im9hdXRoIiwidGltZXN0YW1wIjoxNzM2Mzk2MDYzfV0sInNlc3Npb25faWQiOiI1YjUwNTVhYi0zMzcwLTRmM2EtODhlYy00OGIxYTJkYWUwMTYiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.vAHdGjPFALwkc2LVjxWWbrrsCp1ZKHXue05-1F9xPX8" \
-H "Content-Type: application/json" \
-d '{
  "user_id": "user123",
  "invite_id": 1,
  "clear_status": 75,
  "difficulty": 7,
  "horror_level": 8,
  "story_rating": 9,
  "activity_level": 5,
  "scale_rating": 7,
  "lock_rating": 7,
  "device_rating": 3,
  "tags": ["친절한 가이드", "몰입도 높은 퍼즐"],
  "review_content": "정말 재밌었어요!",
  "remaining_time": "10분",
  "success_status": "y"
}'

```
5. 리뷰쓰기 기능 - 리뷰할대 초대장 정보 api
2번 API 중복
6. 리뷰쓰기 기능 - 리뷰내용 날리는 api (초대정보랑 가게정보 포함해서 날릴꺼)
2번 API 중복