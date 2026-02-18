# Military Doctrine Knowledge Graph

미군 교범을 체계적으로 학습하고 체크리스트로 수행할 수 있는 웹 애플리케이션입니다.

## 주요 기능

### 📚 5단계 프로세스
1. **문단 식별 정보** - 교범 출처 및 위치 정보
2. **문장 분해** - 각 문장을 체크리스트로 관리
3. **키워드** - 주요 용어 하이라이트 및 연결
4. **Claims (핵심 사실)** - 문단의 핵심 내용 요약
5. **References (참조)** - 내부 단락 및 그림/표 참조

### ✨ 특징
- 📝 문장별 체크박스로 학습 진행 상황 추적
- 🔑 키워드 색상 코딩 및 자동 하이라이트
- ⭐ 핵심 사실(Claims) 별도 관리
- 🔗 단락 간 참조 링크
- 💾 LocalStorage 자동 저장
- 📱 PWA 지원 (오프라인 사용 가능)
- 🎨 군사적 디자인 (다크 모드)

## 사용 방법

### 1. 샘플 데이터로 시작
앱을 열면 `sample-doctrine.json` 파일이 자동으로 로드됩니다.

### 2. 커스텀 교범 로드
1. 사이드바 상단의 "📁 Load Doctrine JSON" 버튼 클릭
2. JSON 파일 선택
3. 자동으로 모든 단락이 로드됩니다

### 3. 학습하기
1. 사이드바에서 단락 선택
2. 5개 탭을 활용하여 학습:
   - **Sentences**: 문장별로 체크하며 학습
   - **Keywords**: 주요 용어 확인 및 관련 문장 이동
   - **Claims**: 핵심 사실 체크
   - **References**: 참조 링크 확인
   - **Summary**: 전체 요약 읽기

## JSON 데이터 형식

```json
{
  "doc_title": "ATP 3-21.20 Infantry Battalion",
  "issuing_org": "HEADQUARTERS DEPARTMENT OF THE ARMY",
  "paragraphs": [
    {
      "paragraph_number": "3-6",
      "paragraph_title": "defense of a linear obstacle",
      "sentences": [...],
      "keywords": [...],
      "claims": [...],
      "references": [...],
      "summary": {...}
    }
  ]
}
```

자세한 데이터 구조는 `sample-doctrine.json` 파일을 참고하세요.

## 기술 스택
- HTML5, CSS3, Vanilla JavaScript
- PWA (Progressive Web App)
- LocalStorage for data persistence

## 브라우저 호환성
- Chrome/Edge (권장)
- Firefox
- Safari

---

**Made for military doctrine study** 🎖️
