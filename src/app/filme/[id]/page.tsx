import { useFetch } from "@/hooks/useFetch"; // Ajuste o caminho conforme necessário
import type { MovieTmdb } from "@/types/Tmdb";

const MoviePage = ({ movieId }: { movieId: string }) => {
  const { data, error, loading } = useFetch<MovieTmdb>(`/filmes/${movieId}`, {});

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      {data && (
        <div>
          <h1>{data.title}</h1>
          <p>Popularidade: {data.popularity}</p>
          {/* Adicione outros dados do filme conforme necessário */}
        </div>
      )}
    </div>
  );
};

export default MoviePage;
