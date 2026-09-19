# School of AI SA

A free, open curriculum for the **AI Solutions Architect** role, inspired by [LinkedIn's School of SRE](https://linkedin.github.io/school-of-sre/).

The AI SA designs how machine learning models, generative AI components, data pipelines, and cloud infrastructure fit together to solve real business problems — securely, cost-effectively, and at scale. This curriculum teaches the foundational and applied skills for that role, with hands-on labs that run on free tiers and open tools.

## Reading the site

```bash
pip install -r requirements.txt
mkdocs serve
```

Then open http://127.0.0.1:8000.

## Building and deploying

```bash
mkdocs build          # outputs static site to site/
```

The built site is fully static. Pushes to `main` deploy to [GitHub Pages](https://mibali.github.io/school-of-ai-sa/) through the included GitHub Actions workflow. It can also deploy to Netlify or any static host with no server-side code.

## Contributing

See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md). Everything in this curriculum is a starting point, and corrections are especially welcome — AI moves fast.

## License and attribution

School of AI SA is licensed under [CC BY 4.0](LICENSE). It includes modified material from [LinkedIn's School of SRE](https://github.com/linkedin/school-of-sre), copyright 2020 LinkedIn Corporation, which is also licensed under CC BY 4.0. See [NOTICE](NOTICE) for the required attribution and modification notice. This project is not affiliated with, endorsed by, or sponsored by LinkedIn.
