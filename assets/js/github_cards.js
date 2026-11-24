// Fills the GitHub cards on the repositories page from the public GitHub API
// (replaces the former github-readme-stats / github-profile-trophy images).
(function () {
  function fill(card, desc, meta) {
    card.querySelector('.repo-card-desc').textContent = desc || '';
    card.querySelector('.repo-card-meta').textContent = meta.filter(Boolean).join('  ·  ');
  }
  function load(url, onOk) {
    fetch(url, { headers: { Accept: 'application/vnd.github+json' } })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(onOk)
      .catch(function () { /* keep the static title and link */ });
  }
  document.querySelectorAll('.repo-card[data-repo]').forEach(function (card) {
    load('https://api.github.com/repos/' + card.dataset.repo, function (d) {
      card.querySelector('.repo-card-title').textContent = d.full_name;
      fill(card, d.description, [d.language, '★ ' + d.stargazers_count, '⑂ ' + d.forks_count]);
    });
  });
  document.querySelectorAll('.repo-card[data-user]').forEach(function (card) {
    load('https://api.github.com/users/' + card.dataset.user, function (d) {
      card.querySelector('.repo-card-title').textContent = d.name || d.login;
      fill(card, d.bio, [d.public_repos + ' public repos', d.followers + ' followers']);
    });
  });
})();
