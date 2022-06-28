import stylelint from 'rollup-plugin-stylelint';

export default {
  entry: './main.ts',

  plugins: [
    stylelint({
        //stylelint config
    })
  ]
}