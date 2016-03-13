from behave import *


@given('I have {starting_apples} apples')
def impl(ctx, starting_apples):
    ctx.starting_apples = int(starting_apples.replace('"', ''))


@when('I get given {more_apples} apples')
def impl(ctx, more_apples):
    ctx.more_apples = int(more_apples.replace('"', ''))


@then('I should have {sum_of_apples} apples')
def impl(ctx, sum_of_apples):
    assert ctx.starting_apples + ctx.more_apples == int(sum_of_apples.replace('"', ''))
