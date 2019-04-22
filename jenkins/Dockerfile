FROM ruby:2.5
LABEL maintainer <noc@drizly.com>

WORKDIR /tmp
COPY Gemfile* /tmp/
COPY *.gemspec /tmp/

## bundle requires version, so just copying that
COPY lib/*/version* lib/react_webpack_rails/

RUN bundle install --jobs 20 --retry 5

ADD ./ /app
WORKDIR /app

ENTRYPOINT ["bundle", "exec"]
