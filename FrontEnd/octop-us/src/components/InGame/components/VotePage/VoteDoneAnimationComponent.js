import "./VoteAnimationComponent.scss";

function VoteDoneAnimationComponent(props) {
  return (
    <div>
      <div class="container_vote">
        <div class="base_vote">
          <div class="top-front_vote"></div>
          <div class="shadow_vote"></div>
          <div class="text_vote">vote</div>
        </div>
        <div class="top-top_vote"></div>
        <div class="top-top2_vote">
          <div class="slot3_vote"></div>
        </div>
        <div class="top-top3_vote">
          <div class="slot2_vote"></div>
        </div>
        <div class="ballot_vote_up">
          <div class="vote_result_page">
            <p class="result_title">투표 결과</p>
            <p class="result_name">{props.voteName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoteDoneAnimationComponent;
