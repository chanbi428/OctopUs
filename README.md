# <img src="/uploads/3c6c9e2daadd3c7360744304fd927bc3/그림2.png" width="300" height="150"/>
<br>
![landingimage](/uploads/3e9edbbf02303e17bce4d4fa150c0ea3/landingimage.jpg)

#### 문어마을에서 오징어 살인마를 찾아라! 
#### WebRTC 화상 채팅 기술과 게임 캐릭터, 미니게임을 접목한 생동감 있는 마피아 게임

<br>

## 🚀 목차
1. [👩‍👩‍👧‍👦 팀원 소개](#-팀원-소개)
2. [📝 프로젝트 개요](#-프로젝트-개요)
3. [✍️ 프로젝트 소개](#-프로젝트-소개)
- 1. [🐙타겟](#-타겟)
- 2. [🦑게임 규칙](#-게임-규칙)
- 3. [⚽게임 FLOW](#-게임-flow)
4. [💡 주요 기능](#-주요-기능)
5. [⚙️ 기술 스택](#-기술-스택)
6. [🏑 conventionss](#-conventionss)
5. [🌐 배포 방법](#-배포-방법)


<br>

## 👩‍👩‍👧‍👦 팀원 소개
#### 🧑‍💻 <strong>장지선</strong> - 팀장, FE, Build
#### 🧑‍💻 <strong>배찬비</strong> - FE, BE
#### 🧑‍💻 <strong>손준혁</strong> - FE, BE, Server 배포
#### 🧑‍💻 <strong>오하민</strong> - FE
#### 🧑‍💻 <strong>이다영</strong> - FE, BE
#### 🧑‍💻 <strong>이승연</strong> - FE, 디자인


<br>

## 📝 프로젝트 개요
![개요](/uploads/107bae7b2ec7a56a995fce0eef969a1d/개요.png)
* <strong>진행 기간</strong>: 2021.07.05 ~ 2021.08.18
* <strong>목표</strong>
  * 플레이어들은 화상 채팅을 통해 서로 소통하며 기존 채팅 기반 클래식 마피아 게임보다 더욱 몰입할 수 있습니다.
  * 능력을 가진 다양한 직업들로 구성되어 플레이어들의 참여도를 높였습니다.
  * 미니 게임을 추가하여 죽은 플레이어(유령)도 게임 중에 참여할 수 있도록 설계하였습니다.
  * 재미있는 애니메이션과 사용자 친화적인 UI/UX를 설계해 게임의 몰입감을 높입니다. 
<br>


## ✍️ 프로젝트 소개
<strong>Octop Us</strong>는 온라인으로 마피아 게임을 즐길 수 있는 화상 기반 마피아 웹 게임입니다.

코로나 19 바이러스 이후 비대면 수요 증가로 화상 회의의 중요성이 대두되었습니다. 이를 마피아 게임과 연동하여 <strong>"Octop Us"</strong>는 기존의 게임의 퀄리티를 올리고, 실제 같은 공간에서 게임을 하는 듯한 몰입감과 즐거움을 줄 수 있는 서비스를 제공하고자 합니다. 

### 🐙 타겟
![타겟](/uploads/5b8c019e0562fb230be227ec7ad0a86b/타겟.png)

### 🦑 게임 규칙

- 인원 수(8인)에 따른 직업 분배 및 직업 설명
  - 오징어(마피아) 팀
    - 오징어(마피아) (2)
      - 밤에 오징어들은 상의를 통해 플레이어를 한 명 선택하고 죽일 수 있다.
      - 포인터 하나를 공유하며 마지막에 선택된 플레이어가 사망한다.
      - 플레이어를 선택을 한 경우 (의사가 살리지 않은 경우) : 다음날 낮에 “(지목 대상)이 사망하였습니다.”라는 문구가 뜬다.
      - 플레이어를 선택을 한 경우 (의사가 살린 경우) : 다음날 낮에 “아무 일도 일어나지 않았습니다.”라는 문구가 뜬다.
      - 플레이어를 선택을 하지 않은 경우 : 그냥 넘어 간다.
  - 시민(문어) 팀
    - 의사 (1)
      - 밤에 한 명을 택하여 오징어의 공격을 무효화한다.
      - 포인터 하나로 선택하며 마지막에 고른 플레이어가 무효화 대상이 된다.
      - 의사가 플레이어를 살린 경우 : 다음날 낮에 “아무 일도 일어나지 않았습니다.”는 문구가 뜬다.
      - 의사가 플레이어를 살리지 못한 경우 : 다음날 낮에 한 명 사망한다.
      - 플레이어를 선택하지 않은 경우 : 그냥 넘어간다.
    - 경찰 (1)
      - 밤에 한 명을 지목하여 오징어인지 아닌지 알아낼 수 있다.
      - 포인터 하나로 선택하며 마지막으로 택한 플레이어의 오징어 결과를 다음날 낮에 본인에게만 채팅으로 알려줍니다.
      - 오징어를 정확히 고른 경우 - “(선택 대상)은 오징어입니다.” 라는 문구가 뜬다.
      - 플레이어를 선택하지 않은 경우 : 그냥 넘어간다.
    - 크레이지 경찰 (1)
      - 경찰의 역할을 수행하지만 효력이 없다.
      - 본인이 크레이지 경찰인 지 모른다. (경찰로 안다.)
    - 시장 (1)
      - 투표에서 표 1.5개 주어지는 직업이다.
      - 밤에는 활동을 하지 않는다.
    - 기자 (1)
      - 능력을 한 게임에 한 번만 사용 가능하다.
      - 플레이어를 선택을 한 경우 : 밤에 마지막으로 선택한 플레이어의 직업 정보를 아침에 전체 공개한다.
      - 플레이어를 선택을 하지 않은 경우 : 그냥 넘어 간다.
  - 중립 팀
    - 재간둥이 (1)
      - 투표를 통해 본인이 죽으면 승리한다.
    
- 승리조건 
  - 오징어(마피아) 팀
    - 오징어(마피아)수와 비마피아 수(중립 + 시민)가 동률인 경우
    - 최대 턴수 (16턴)에 도달한 경우
  - 시민 팀
    - 오징어(마피아)를 전부 처형한 경우 승리
  - 중립 팀
    - 투표로 처형당한 경우 승리

- 투표 규칙
  - 투표의 종류 : 3가지
    - `낮 투표`: 살아있는 모든 플레이어 참가할 수 있는 투표로 여기서 최다득표자는 최종투표 후보가 됨
    - `찬반 투표`: 최자득표자를 처형할지 안할지 정하는 투표
    - `밤 투표`: 능력이 있는 직업 플레이어들은 투표로 역할을 수행한다.

  - 투표에 적용되는 사항
    - 투표 시간동안 마음껏 투표 대상을 바꿀 수 있다. (취소도 가능)
    - 기본적으로 투표하지 않는다면 이는 무효표를 던진 것으로 간주한다.
    - 밤 투표의 경우 오징어(마피아)끼리만 자신이 누구에게 투표했는지를 실시간으로 반영한다.
    - 무효표와 동률에 관한 조항
      - 기본적으로 무효표가 과반이 넘어가면 그 투표는 무효로 처리한다.
      - 밤투표와 최종투표의 경우 동률이 나오면 투표 결과를 무효로 처리한다.

### ⚽ 게임 FLOW
1. `시작`: 각 플레이어는 자신의 직업이 무엇인지 받아보게 됩니다.
2. `밤 투표`: 각 플레이어는 직업에 따른 역할을 수행할 수 있습니다.
2. `낮 애니메이션`: 밤동안 일어난 플레이어들의 역할 수행 결과가 나옵니다.
3. `미니게임`: 밤동안 오징어가 미니게임을 선택했다면 낚시/상어 미니게임이 시작됩니다.
4. `미니게임 오징어 승`: 오징어가 승리했다면, `7-9. 투표`를 skip하게 됩니다.
5. `미니게임 문어 승`: 문어가 승리했다면, 기본 시나리오대로 흘러갑니다.
6. `낮`: 회의를 통해 의심가는 플레이어를 찾아냅니다.
7. `낮 투표`: 각 플레이어는 의심스러운 사람을 투표 할 수 있습니다.
8. `낮 투표-결과`: 최다득표자가 있는 경우 `9. 찬반 투표`로 넘어가게 됩니다. 없는 경우 `2. 밤 투표` 로 넘어가게 됩니다.
9. `찬반 투표`: 최자득표자는 주어진 시간 동안 변론하게 됩니다. 나머지 플레이어는 최종 변론자에게 <strong>찬성/반대</strong> 투표합니다.
10. `최종 투표 결과 발표`: 찬반 투표에 따른최종 투표 결과를 확인합니다.
11. `종료`: 어느측이 승리했는지를 발표하게 되며, 대기실로 다시 돌아가게 됩니다.

<br>

## 💡 주요 기능
### 메인 페이지
> 방 검색 기능 
- 참여하고자 하는 방을 검색을 통해 찾을 수 있습니다.
> 빠른 게임 시작
 - 대기중인 방 중에서 플레이어수가 가장 많은 방에 들어가 빨리 시작할 수 있도록 합니다.
> 방 생성 기능
- 방을 설정하고 생성할 수 있습니다.

### 대기실 페이지
> 방장 위임 기능
- 방장이 방을 나간 경우 방장 위임이 가능합니다.

> 방 수정 기능
- 방 설정을 수정할 수 있습니다.

> 방 삭제 기능
- 방에 플레이어가 한명도 없는 경우 자동으로 방이 삭제됩니다.

> 문어 애니메이션
- 방에 들어온 플레이어에 따라 다른 색의 문어 캐릭터가 배정됩니다.

### 밤 페이지
> 오징어 밤 역할 수행 기능
- 오징어끼리 화상, 음성, 채팅 소통이 가능합니다.
- 투표도 실시간으로 서로 공유하며 반영됩니다.

> 오징어 미니게임 선택 기능
- 오징어는 미니게임을 선택 할 수 있습니다.

> 의사 밤 역할 수행 기능

> 기자 밤 역할 수행 기능

> 경찰,크레이지 경찰 밤 역할 수행 기능

### 낮 페이지
> 플레이어 화상 음성 채팅 기능
- 플레이어끼리 화상, 음성, 채팅 소통이 가능합니다.
- 죽은 플레이어는 플레이어들에게 화상,음성,채팅을 보낼 수 없습니다.

> 죽은 플레이어(유령) 관중 기능
- 죽은 유령 플레이어는 모두의 화상,음성,채팅을 볼 수 있습니다.
- 죽은 유령 플레이어간 채팅 소통이 가능합니다. (살아있는 플레이어는 볼 수 없습니다)

### 투표 및 찬반투표 페이지
> 투표 기능
- 살아있는 플레이어들은 투표를 할 수 있습니다.
- 선택한 플레이어를 실시간으로 보여줍니다.

> 찬반투표 기능
- 최다득표자의 마지막 발언을 들을 수 있습니다.
- 최다득표자의 처형을 찬/반 투표할 수 있습니다.

### 미니게임  기능
> 낚시꾼 미니게임
- 오징어 vs 문어 팀으로 클릭횟수의 평균값에 따른 승패를 결정합니다.

> 상어 미니게임
- 오징어 vs 문어 팀으로 빨리 숫자 퍼즐 미션을 완성한 팀이 승리합니다.

<br>


## ⚙️ 기술 스택

![기술스택](/uploads/fb67c18d7e441b9647a2e81117b57c6f/기술스택.png)

- Issue 관리
  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/64809643-837d-44aa-a9a9-5e527b7310ab/Untitled.png)
  - JIRA
  

- 형상 관리
  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6e4c3fab-30f8-42fd-b5d6-6cd691ed71c7/Untitled.png)
  - GitLab

- 커뮤니티
  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/92d95b47-1a62-4e0c-9101-615308bb32bc/Untitled.png)
  - MatterMost
  
  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1259be28-17c9-405f-8733-f8e49c15be65/Untitled.png)
  - Webex


- 개발 환경
  
  - OS: Windows ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/300d5c9c-19ea-45b5-a2c9-90960b869e11/Untitled.png)
  
  - IDE 
    - ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/842cfe45-3815-4c76-a6e2-3411cb81b70a/Untitled.png)
    - IntelliJ IDEA 2022.1.4 (Ultimate Edition)

    - ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/bb830199-e22d-4ffe-9c74-19c75a74429d/Untitled.png)
    - Visual Studio Code 1.70.1
  
  - Database
    - ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/febb442f-8078-4075-8853-aff53df957de/Untitled.png)
    - MariaDB 10.3.34
    - ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/adf61f3d-7760-4167-8cb6-49dcb4316391/Untitled.png)
    - MySQL WorkBench 8.0

  - Server
    ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/8e77f058-3440-41be-86e7-7e8fe907a370/Untitled.png)
    - Ubuntu 20.04 LTS

- frontend
  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/5335f244-0ef2-4f26-92d1-918c8157d2fc/Untitled.png)
  - HTML5, CSS3, JAVASCRIPT(ES6)
  - React 17.0.2
  - React-redux 8.0.2
  - redux-toolkit 1.8.3
  - Node JS 16.16.0
  - OpenVidu 2.22.0

- backend
  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f209b572-fd27-48ed-8d7e-145d35350c10/Untitled.png)
  - Java (Zulu 8.33.0.1-win64)
  - Spring Boot Gradle 7.5
  - Lombok 1.18.24
  - Swagger 3.0.0
  - JPA
  - JWT

- AWS EC2
  ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ac1a29cf-0a4b-4503-81ad-cc2be4d39ef4/Untitled.png)
  - Docker (20.10.17)
  - Nginx (1.18.0)
  - certBot


<br>

## 🏑 conventionss
### commit message convention
#[jira number] types : 요구사항 기능 이름
- algular commit message convention 
  - type(scope): short summary
  - type 종류
    - feat : 새로운 기능 추가
    - fix : 버그 수정
    - docs : 문서 관련
    - style : 스타일 변경 (포매팅 수정, 들여쓰기 추가, …)
    - refactor : 코드 리팩토링
    - test : 테스트 관련 코드
    - build : 빌드 관련 파일 수정
    - ci : CI 설정 파일 수정
    - perf : 성능 개선
  - short summary
    - 마침표 쓰지 않기
    - 한글 영문, 모두 가능

### git branch convention
- 브랜치명 : 브랜치종류/요구사항id/개발자이름
- master - develop - feature
- 개인 개발한 것들은 모두 feature/기능 브랜치에서 수행
- 프론트와 백에서 asignee로 지명된 이들이 심사후 develop으로 merge
- master에 merge할 경우 팀원 모두 모여서 회의 후 진행

<br>

## 🌐 배포 방법

#### OpenVidu 서버

##### OpenVidu 설치
※ 해당 방식은 [공식 문서](https://docs.openvidu.io/en/stable/deployment/ce/on-premises/) 를 참조했습니다.
- 1. /opt 폴더로 이동
- 2. git clone으로 설치
```
curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_latest.sh | bash
```
    * 권한 문제 발생시 curl 앞에 sudo 그리고 bash 앞에 sudo 붙이면 해결 가능
- 3. conf 파일 설정
    - 3.1. /opt/openvidu폴더에 .env파일 열기
    - 3.2 ssl 인증서 관련 설정을 아래와 같이 수정
    ![Untitled](/uploads/3af075b4fef259514a4eb9dc86eacef3/Untitled.png)
    - 3.3 포트 관련 설정을 아래와 같이 수정
      ```
        HTTP_PORT=80
        HTTP_PORT=80
      ```
        저장 후 편집기 종료
    - 3.2 CertBot 설치
      ```
        sudo apt-get install letsencrypt -y
      ```

##### Openvidu 실행
- 1. OpenVidu 설치된 폴더 이동 (/opt/openvidu)
- 2. 아래 명령어로 실행 
  ```
    ./openvidu start
  ```
- 3. 정상적으로 실행 되는지 확인
  - 3.1. 실행한 콘솔 창에 해당 서버 링크와 포트 번호 나오는지 확인
  - 3.2. sudo docker ps통해 해당 이미지들이 잘 실행 중인지 확인
  - 3.3. 해당 포트로 사이트가 아래 사진처럼 잘 나오는지 확인
    ![Untitled__1_](/uploads/9a1eea4e78434a09431c0ee7f2385975/Untitled__1_.png)
    * 특히 주소창 왼쪽 자물쇠 모양(HTTPS 연결) 상태를 꼭 확인 할 것.
  - 3.4. 정상 작동 확인이 되었다면 포트를 원하는 포트로 변경 후 재시작 (추후 설치할 Nginx를 위해 변경해야 함)

#### Front & Back End 서버
- 빌드 파일 위치한 폴더 이동 (/home/ubuntu/build)
- 아래 명령어로 실행 
```
java -jar [Server File Name].jar
```

