$(document).ready(() => {
  const API = "http://localhost:8000/tweets";

  const tweetBtn = $("#tweet-btn");
  const tweetInp = $("#tweet-inp");
  const likeBtn = $("#like-btn");

  async function addTweet(event) {
    event.preventDefault();
    try {
      await axios.post(API, {
        tittle: tweetInp.val().trim(),
        authorId: 1,
        likes: 0,
        reTweets: 0,
        comments: [
          { id: 1, comment: "Good!" },
          { id: 2, comment: "WoW!" },
          { id: 3, comment: "Nice!" },
        ],
      });
      console.log("Successfully created");
    } catch (error) {
      console.log(error);
    }
  }
  tweetBtn.on("click", addTweet);

  async function renderTweet() {
    $(".tweets").html("");
    const response = await axios(API);
    response.data.forEach((element) => {
      $(".tweets").append(`
          <div class="card">
    <div class="card-header">
      Tweet #${element.id}
    </div>
    <div class="card-body">
      <p class="card-text">${element.title}</p>
      <a href="#" class="like-btn btn btn-outline-primary">Like ${element.likes}</a>
    </div>
  </div>
          `);
    });
  }
  renderTweet();
});
