import Doodle from "./Doodle";

export default function Triangles({ labs }) {
  return (
    <Doodle
      rule={`
  :doodle {
    @grid: 10x10;
    width: 68vmin;
    height: 50vmin;
    grid-gap: 3px;
  }

background: @pick(#155263, #ff6f3c, #ff9a3c, #ff9a3c, #ffc93c);
opacity: @rand(.25);
transition: @rand(.2s, .5ms) ease @rand(200ms);
transform:
  rotate(@rand(360deg))
  scale(@rand(4));
clip-path: polygon(
  @rand(100%) 0,
  100% @rand(100%),
  0 @rand(100%),
  0 @rand(100%)
);
);

  `}
    />
  );
}
