import unittest
import yaml


conf_yaml = """
site_name: Demo site
logo_url: http://thing.com/logo.png
site_desc: |
  <p>A HTML site description</p>
menu:
- name: Feature
  type: feature
- name: Task Management
  type: tag
  expr: |
    ^task_management_(.+)$
- name: Creating a Task
  type: tag_page
  expr: |
    ^create_task_(.+)$
features:
- name: Create a Task
  title: Create a Task
  desc: |
    <p>Creating a task makes it easier for people to see what you're doing</p>
  image: http://image.com/url.png
tags:
- name: task_management_create_task
  title: Creating tasks
  image: http://image.com/url.png
  desc: |
    <p>Creating a task helps to get work done and makes it easier to see what people are doing.</p>
  long_desc: |
    <p>A longer description</p>
  links:
  - name: A website
    url: http://a.website.com
"""


class TestYAMLConfiguration(unittest.TestCase):

	def test_read_yaml_configuration_format(self):
		conf = yaml.load(conf_yaml)
		self.assertEqual(conf.get('site_name'), 'Demo site', 'Incorrect site name loaded')
		self.assertEqual(conf.get('logo_url'), 'http://thing.com/logo.png', 'Incorrect logo url loaded')
