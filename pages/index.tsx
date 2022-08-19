import axios from "axios";
import moment from "moment";
import { CommitsResponse, InfosDosCommits } from "../interfaces/interfaces";

export async function getServerSideProps() {
  try {
    const res = await axios.get<CommitsResponse[]>(
      "https://api.github.com/repos/trinks-com/trinks.web/commits?per_page=100",
      {
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: "Bearer " + process.env.GITHUB_TOKEN,
        },
      }
    );

    const rollbacks = res.data
      .map((res) => {
        if (
          res.commit.message.indexOf("revert") > -1 &&
          res.commit.verification.verified
        ) {
          let dados: InfosDosCommits = {
            sha: res.sha,
            message: res.commit.message,
            date: res.commit.author.date,
            htmlUrl: res.html_url,
          };
          return dados;
        }
      })
      .filter((rollback) => rollback);

    return {
      props: {
        ultimoRollback: rollbacks[0],
      },
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      return "An unexpected error occurred";
    }
  }
}

interface HomePageProps {
  ultimoRollback: InfosDosCommits;
}

const Home = function ({ ultimoRollback }: HomePageProps) {
  const { date, htmlUrl } = ultimoRollback;

  const dataDoUltimoAcidente = moment(date);
  const agora = moment();

  const quantidadeDeDiasSemAcidentes = agora.diff(dataDoUltimoAcidente, "days");

  return (
    <>
      <div className="bg-orange rounded-lg text-white uppercase mt-20 p-5 text-center font-semibold text-2xl">
        Sem prevenção o acidente é certo
      </div>
      <div className="rounded-lg border-4 border-orange my-6 text-center font-semibold text-2xl">
        Estamos sem acidentes há
        <br />
        <span className="text-9xl">
          {quantidadeDeDiasSemAcidentes}{" "}
          {quantidadeDeDiasSemAcidentes == 1 ? " dia" : " dias"}
        </span>
      </div>
      <div className="bg-orange rounded-lg text-white uppercase mt-20 p-5 text-center font-semibold text-2xl">
        Colabore você também com o aumento desse índice
        <br />
        <a
          href={htmlUrl}
          target="_blank"
          rel="noreferrer"
          className="text-xs capitalize"
        >
          Link do último rollback
        </a>
      </div>
    </>
  );
};

export default Home;
