# WMLAlive Archive

Google Sheets의 `WMLAlive`, `WMLNAlive` 탭을 사용하는 정적 웹사이트입니다.
각 탭의 `Nickname`, `Content` 헤더를 기준으로 읽고 저장합니다.

- 웹사이트: https://suhyouri.github.io/renderTest/
- 프런트엔드: `public/` (GitHub Pages)
- 서버: `apps-script/Code.gs` (Google Apps Script 웹 앱)
- 연결 주소: `public/config.js`의 `scriptUrl`

Apps Script를 웹 앱으로 배포할 때 실행 사용자는 소유자, 접근 권한은 모든 사용자로 지정합니다.
배포된 `/exec` URL을 `scriptUrl`에 넣습니다. 수정 후 새 버전으로 배포해야 합니다.
답변은 저장 성공 응답 이후에만 입력창에서 지워집니다. 목록은 15초마다 갱신됩니다.
같은 요청을 재전송하면 6시간 동안 중복 저장을 방지합니다.
Notion/Express/Socket.IO 서버는 정적 사이트에서 사용하지 않습니다.

인증 완료 전에도 공개된 시트의 기존 답변은 직접 조회합니다. 새 답변 저장에는 Apps Script 연결이 필요합니다.

검증: `node tests/apps-script.cjs`

배포 갱신: `git subtree split --prefix public -b pages-release` 후 `git push origin pages-release:gh-pages`
