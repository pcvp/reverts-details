import type { NextPage } from "next";

export async function getServerSideProps() {
  const res = await fetch(
    "https://api.github.com/repos/trinks-com/trinks.web/commits",
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: "Bearer " + process.env.GITHUB_TOKEN,
      },
    }
  );
  const json = await res.json();

  return {
    props: {
      json: json,
    },
  };
}

const Home: NextPage = (json: any) => {
  //const jsonParsed = JSON.parse(json);
  console.log(json);
  return <div>Teste</div>;
};

export default Home;
